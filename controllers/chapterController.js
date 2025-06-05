import Chapter from '../models/Chapter.js';
import redisClient from '../utils/redisClient.js';

// GET all chapters using  filtering, pagination & caching 
export const getChapters = async (req, res) => {
  const {
    class: cls,
    unit,
    status,
    isWeakChapter,
    subject,
    page = 1,
    limit = 10
  } = req.query;

  const filter = {};
  if (cls) filter.class = cls;
  if (unit) filter.unit = unit;
  if (status) filter.status = status;
  if (isWeakChapter) filter.isWeakChapter = isWeakChapter === 'true';
  if (subject) filter.subject = subject;
 
  // validation with pagination
  const cacheKey = `chapters:${JSON.stringify(filter)}:${page}:${limit}`;
  const cached = await redisClient.get(cacheKey); // checking the cache data
  if (cached) return res.json(JSON.parse(cached));

  try {
     // total counter of chapters.
    const total = await Chapter.countDocuments(filter);
    const chapters = await Chapter.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const response = { total, chapters };
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(response)); // caching  for 1 hour

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET chapter by its id
export const getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ error: 'Not found' });
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID or server error' });
  }
};


// for  uploading the  chapters (in a bulk)
export const uploadChapters = async (req, res) => {
  const chapters = req.body;

   // checking if chapters is an array
  if (!Array.isArray(chapters)) {
    return res.status(400).json({
      message: "Invalid input. Expected an array of chapter objects.",
    });
  }
 
  
  // Validate each chapter object
  const inserted = [];
  const failed = [];

  for (const ch of chapters) {
    try {
      const {
        chapter,
        class: className,
        unit,
        subject,
        status,
        isWeakChapter,
        questionSolved,
        yearWiseQuestionCount,
      } = ch;

      // Validate the required fields
      if (
        !chapter ||
        !className ||
        !unit ||
        !subject ||
        !status ||
        typeof questionSolved !== "number" ||
        typeof yearWiseQuestionCount !== "object"
      ) {
        throw new Error("Missing or invalid required fields");
      }

      const newChapter = new Chapter({
        chapter,
        class: className,
        unit,
        subject,
        status,
        isWeakChapter: isWeakChapter || false,
        questionSolved,
        yearWiseQuestionCount,
      });

      await newChapter.validate();
      await newChapter.save();
      inserted.push(newChapter);
    } catch (err) {
      failed.push({ data: ch, error: err.message });
    }
  }


 // Invalidating  cache for chapters 
  try {
    const keys = await redisClient.keys('chapters:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.error("Failed to invalidate chapter cache:", err.message);
  }


  res.status(200).json({
    message: "Bulk upload completed",
    insertedCount: inserted.length,
    failedCount: failed.length,
    failed,
  });
};


