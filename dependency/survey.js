const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/submitGeneralInfo', (req, res) => {
  const userId = req.userId;
  const { contactNum, mobileNum, civilStat, sex, region, province, residence } = req.body;

  const generalInfoSql = `INSERT INTO generalinformation 
  (alumniid, telnumber, mobilenum, civilstatus, sex, region, province, residence) VALUES (?,?,?,?,?,?,?,?)`;
  
  db.query(generalInfoSql, [userId, contactNum, mobileNum, civilStat, sex, region, province, residence], (err, result) => {
    if (err) {
      console.error('GENINFO: ' + err.message);
      return res.status(500).send(err.message);
    }
    res.json({ message: 'General information inserted successfully', result });
  });
});

router.post('/submitEducationalBackground', (req, res) => {
  const userId = req.userId;
  const { educationalAttain, professionalExams, undergraduateReasons, graduateReasons } = req.body;

  const educAttainJson = JSON.stringify(educationalAttain);
  const profExamJson = JSON.stringify(professionalExams);
  const undergradReasJson = JSON.stringify(undergraduateReasons);
  const gradReasJson = JSON.stringify(graduateReasons);

  const educationalBackgroundSql = `INSERT INTO educationalbackground 
  (alumniid, educattain, exampassed, reasonundergrad, reasongrad) VALUES (?,?,?,?,?)`;
  
  db.query(educationalBackgroundSql, [userId, educAttainJson, profExamJson, undergradReasJson, gradReasJson], (err, result) => {
    if (err) {
      console.error('EDUC: ' + err.message);
      return res.status(500).send(err.message);
    }
    res.json({ message: 'Educational background inserted successfully', result });
  });
});

router.post('/submitTraining', (req, res) => {
  const userId = req.userId;
  const { trainings, reasonAdvanceStud } = req.body;

  const trainingJson = JSON.stringify(trainings);
  const reasAdvanStudJson = JSON.stringify(reasonAdvanceStud);

  const trainingSql = `INSERT INTO training 
  (alumniid, trainingtitle, reason) VALUES (?,?,?)`;
  
  db.query(trainingSql, [userId, trainingJson, reasAdvanStudJson], (err, result) => {
    if (err) {
      console.error('TRAINING: ' + err.message);
      return res.status(500).send(err.message);
    }
    res.json({ message: 'Training data inserted successfully', result });
  });
});

router.post('/submitEmploymentData', (req, res) => {
  const userId = req.userId;
  const { presentlyEmployed, reasonUnemployed, presentEmployStat, skillsAcquired, presentOccupation, majorLine, placeOfWork, firstJobAfterJob, 
    reasonStayingJob, firstJobRelatedToCourse, reasonAcceptingJob, reasonChangingJob, durationFirstJob, howFindFirstJob, durationJobSeeking, firstJobLvl,
    secondJobLvl, earning, curriculumRelevance, competencies, suggestion } = req.body;

  const reasUnemJson = JSON.stringify(reasonUnemployed);
  const reasStayJson = JSON.stringify(reasonStayingJob);
  const reasAccJson = JSON.stringify(reasonAcceptingJob);
  const reasChanJson = JSON.stringify(reasonChangingJob);
  const howFindFJobJson = JSON.stringify(howFindFirstJob);
  const compJson = JSON.stringify(competencies);

  const employmentDataSql = `INSERT INTO employmentdata 
  (alumniid, presentlyemployed, reasonnotemployed, presentemploystatus, skillsaquiredincollege,
    presentoccupation, lineofbusiness, placeofwork, firstjob, reasonstayingonjob, firstjobrelatedtocourse,
    reasonacceptingthejob, reasonchangingjob, firstjobduration, howfoundfirstjob, howlongfoundfirstjob, joblvlposfirstjob, 
    joblvlposcurrentjob, firstjobearning, curriculumrelevance, competencies, suggestions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  
  db.query(employmentDataSql, [userId, presentlyEmployed, reasUnemJson, presentEmployStat, skillsAcquired, presentOccupation, majorLine, placeOfWork,
    firstJobAfterJob, reasStayJson, firstJobRelatedToCourse, reasAccJson, reasChanJson, durationFirstJob, howFindFJobJson, durationJobSeeking, 
    firstJobLvl, secondJobLvl, earning, curriculumRelevance, compJson, suggestion], (err, result) => {
    if (err) {
      console.error('EMPLOY: ' + err.message);
      return res.status(500).send(err.message);
    }
    res.json({ message: 'Employment data inserted successfully', result });
  });
});

router.post('/submitContributionProfile', (req, res) => {
  const userId = req.userId;
  const { awardName, awardBody, date, selectedFiles } = req.body;

  const selectFilesJson = JSON.stringify(selectedFiles);

  const contributionProfileSql = `INSERT INTO contributionprofile 
  (alumniid, awardname, awardbody, date, certificate) VALUES (?,?,?,?,?)`;
  
  db.query(contributionProfileSql, [userId, awardName, awardBody, date, selectFilesJson], (err, result) => {
    if (err) {
      console.error('CONTRI: ' + err.message);
      return res.status(500).send(err.message);
    }
    res.json({ message: 'Contribution profile inserted successfully', result });
  });
});

router.get('/getSurveyGenInfo', (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT a.alumniid, a.name, g.*
  FROM alumni a
  INNER JOIN generalinformation g ON a.alumniid = g.alumniid
  WHERE a.alumniid = ? ORDER BY g.geninfoid DESC`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.log("ERROR GET GENINFO", err);
      res.status(400).json({ message: 'Error fetching general information' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getSurveyEducBack', (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT a.alumniid, a.name, e.*
  FROM alumni a
  INNER JOIN educationalbackground e ON a.alumniid = e.alumniid
  WHERE a.alumniid = ? ORDER BY e.educbackid DESC`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.log("ERROR GET EDUCBACK", err);
      res.status(400).json({ message: 'Error fetching educational background' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getSurveyTraining', (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT a.alumniid, a.name, t.*
  FROM alumni a
  INNER JOIN training t ON a.alumniid = t.alumniid
  WHERE a.alumniid = ? ORDER BY t.trainingid DESC`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.log("ERROR GET TRAINING", err);
      res.status(400).json({ message: 'Error fetching training data' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getEmployData', (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT a.alumniid, a.name, e.*
  FROM alumni a
  INNER JOIN employmentdata e ON a.alumniid = e.alumniid
  WHERE a.alumniid = ? ORDER BY e.employmentdataid DESC`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.log("ERROR GET EMPLOYDATA", err);
      res.status(400).json({ message: 'Error fetching employment data' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getContriProfile', (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT a.alumniid, a.name, c.*
  FROM alumni a
  INNER JOIN contributionprofile c ON a.alumniid = c.alumniid
  WHERE a.alumniid = ? ORDER BY c.contributionid DESC`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.log("ERROR GET CONTRIPROFILE", err);
      res.status(400).json({ message: 'Error fetching contribution profile' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getMode', (req, res) => {
  // SQL query to get the mean age and mode for various columns
  const query = `
    -- Mean Age
    SELECT 'Mean Age' AS metric, 
           FLOOR(AVG(DATEDIFF(CURDATE(), birthday) / 365.25)) AS value
    FROM alumni
    WHERE birthday IS NOT NULL

    UNION ALL

    -- Mode Sex
    SELECT 'Mode Sex' AS metric, sex AS value
    FROM (
      SELECT sex
      FROM generalinformation
      WHERE sex IS NOT NULL AND TRIM(sex) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(sex)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_sex

    UNION ALL

    -- Mode Civil Status
    SELECT 'Mode Civil Status' AS metric, civilstatus AS value
    FROM (
      SELECT civilstatus
      FROM generalinformation
      WHERE civilstatus IS NOT NULL AND TRIM(civilstatus) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(civilstatus)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_civil_status

    UNION ALL

    -- Mode Region
    SELECT 'Mode Region' AS metric, region AS value
    FROM (
      SELECT region
      FROM generalinformation
      WHERE region IS NOT NULL AND TRIM(region) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(region)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_region

    UNION ALL

    -- Mode Province
    SELECT 'Mode Province' AS metric, province AS value
    FROM (
      SELECT province
      FROM generalinformation
      WHERE province IS NOT NULL AND TRIM(province) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(province)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_province

    UNION ALL

    -- Mode Residence
    SELECT 'Mode Residence' AS metric, residence AS value
    FROM (
      SELECT residence
      FROM generalinformation
      WHERE residence IS NOT NULL AND TRIM(residence) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(residence)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_residence;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.log("ERROR GET MODE", err);
      res.status(400).json({ message: 'Error fetching mode values' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getCounts', (req, res) => {
  // SQL query to get counts for various categories
  const query = `
    -- Count of Sex
    SELECT 'Sex' AS category, sex AS value, COUNT(*) AS count
    FROM generalinformation
    WHERE sex IS NOT NULL AND TRIM(sex) <> ''  -- Exclude blank and null values
    GROUP BY LOWER(sex)

    UNION ALL

    -- Count of Age Ranges
    SELECT 'Age Range' AS category, 
           CASE
             WHEN FLOOR(DATEDIFF(CURDATE(), birthday) / 365.25) BETWEEN 0 AND 9 THEN '0-9'
             WHEN FLOOR(DATEDIFF(CURDATE(), birthday) / 365.25) BETWEEN 10 AND 19 THEN '10-19'
             WHEN FLOOR(DATEDIFF(CURDATE(), birthday) / 365.25) BETWEEN 20 AND 29 THEN '20-29'
             WHEN FLOOR(DATEDIFF(CURDATE(), birthday) / 365.25) BETWEEN 30 AND 39 THEN '30-39'
             WHEN FLOOR(DATEDIFF(CURDATE(), birthday) / 365.25) BETWEEN 40 AND 49 THEN '40-49'
             WHEN FLOOR(DATEDIFF(CURDATE(), birthday) / 365.25) BETWEEN 50 AND 59 THEN '50-59'
             WHEN FLOOR(DATEDIFF(CURDATE(), birthday) / 365.25) BETWEEN 60 AND 69 THEN '60-69'
             ELSE '70+'
           END AS value,
           COUNT(*) AS count
    FROM alumni
    WHERE birthday IS NOT NULL
    GROUP BY value
    ORDER BY FIELD(value, '0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+')

    UNION ALL

    -- Count of Civil Status
    SELECT 'Civil Status' AS category, civilstatus AS value, COUNT(*) AS count
    FROM generalinformation
    WHERE civilstatus IS NOT NULL AND TRIM(civilstatus) <> ''  -- Exclude blank and null values
    GROUP BY LOWER(civilstatus)

    UNION ALL

    -- Count of Region
    SELECT 'Region' AS category, region AS value, COUNT(*) AS count
    FROM generalinformation
    WHERE region IS NOT NULL AND TRIM(region) <> ''  -- Exclude blank and null values
    GROUP BY LOWER(region)

    UNION ALL

    -- Count of Province
    SELECT 'Province' AS category, province AS value, COUNT(*) AS count
    FROM generalinformation
    WHERE province IS NOT NULL AND TRIM(province) <> ''  -- Exclude blank and null values
    GROUP BY LOWER(province)

    UNION ALL

    -- Count of Residence
    SELECT 'Residence' AS category, residence AS value, COUNT(*) AS count
    FROM generalinformation
    WHERE residence IS NOT NULL AND TRIM(residence) <> ''  -- Exclude blank and null values
    GROUP BY LOWER(residence);
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.log("ERROR GETTING COUNTS", err);
      res.status(400).json({ message: 'Error fetching counts' });
    } else {
      res.json(results);
    }
  });
});


module.exports = router;
