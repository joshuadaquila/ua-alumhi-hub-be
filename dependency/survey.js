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

router.get('/getSurveySummary', (req, res) => {
  const query = `
  SELECT DISTINCT
  a.alumniid,
  a.name,
  MAX(gi.telnumber) AS gi_telnumber,
  MAX(gi.mobilenum) AS gi_mobilenum,
  MAX(gi.civilstatus) AS gi_civilstatus,
  MAX(gi.sex) AS gi_sex,
  MAX(gi.region) AS gi_region,
  MAX(gi.province) AS gi_province,
  MAX(gi.residence) AS gi_residence,
  MAX(gi.status) AS gi_status,
  MAX(eb.educattain) AS eb_educattain,
  MAX(eb.exampassed) AS eb_exampassed,
  MAX(eb.reasonundergrad) AS eb_reasonundergrad,
  MAX(eb.reasongrad) AS eb_reasongrad,
  MAX(eb.status) AS eb_status,
  GROUP_CONCAT(DISTINCT tr.trainingtitle) AS tr_trainingtitle,
  GROUP_CONCAT(DISTINCT tr.reason) AS tr_reason,
  MAX(ed.presentlyemployed) AS ed_presentlyemployed,
  MAX(ed.reasonnotemployed) AS ed_reasonnotemployed,
  MAX(ed.presentemploystatus) AS ed_presentemploystatus,
  MAX(ed.skillsaquiredincollege) AS ed_skillsaquiredincollege,
  MAX(ed.presentoccupation) AS ed_presentoccupation,
  MAX(ed.lineofbusiness) AS ed_lineofbusiness,
  MAX(ed.placeofwork) AS ed_placeofwork,
  MAX(ed.firstjob) AS ed_firstjob,
  MAX(ed.reasonstayingonjob) AS ed_reasonstayingonjob,
  MAX(ed.firstjobrelatedtocourse) AS ed_firstjobrelatedtocourse,
  MAX(ed.reasonacceptingthejob) AS ed_reasonacceptingthejob,
  MAX(ed.reasonchangingjob) AS ed_reasonchangingjob,
  MAX(ed.firstjobduration) AS ed_firstjobduration,
  MAX(ed.howfoundfirstjob) AS ed_howfoundfirstjob,
  MAX(ed.howlongfoundfirstjob) AS ed_howlongfoundfirstjob,
  MAX(ed.joblvlposfirstjob) AS ed_joblvlposfirstjob,
  MAX(ed.joblvlposcurrentjob) AS ed_joblvlposcurrentjob,
  MAX(ed.firstjobearning) AS ed_firstjobearning,
  MAX(ed.curriculumrelevance) AS ed_curriculumrelevance,
  MAX(ed.competencies) AS ed_competencies,
  MAX(ed.suggestions) AS ed_suggestions,
  MAX(ed.status) AS ed_status,
  GROUP_CONCAT(DISTINCT cp.awardname) AS cp_awardname,
  GROUP_CONCAT(DISTINCT cp.awardbody) AS cp_awardbody,
  GROUP_CONCAT(DISTINCT cp.date) AS cp_date,
  GROUP_CONCAT(DISTINCT cp.certificate) AS cp_certificate
FROM 
  alumni a
LEFT JOIN 
  generalinformation gi ON a.alumniid = gi.alumniid
LEFT JOIN 
  educationalbackground eb ON a.alumniid = eb.alumniid
LEFT JOIN 
  training tr ON a.alumniid = tr.alumniid
LEFT JOIN 
  employmentdata ed ON a.alumniid = ed.alumniid
LEFT JOIN 
  contributionprofile cp ON a.alumniid = cp.alumniid
GROUP BY
  a.alumniid, a.name;

  `;
  db.query(query, (err, results) => {
    if (err) {
      console.log("ERROR GET SURVEY SUMMARY", err);
      res.status(400).json({ message: 'Error fetching survey summary' });
    } else {
      res.json(results);
    }
  });
});


router.get('/getMode', (req, res) => {
  // SQL query to get the mean age, mode for various columns, mode for graduation year, and total number of alumni
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
    ) AS mode_residence

    UNION ALL

    -- Mode Graduation Year
    SELECT 'Mode Graduation Year' AS metric, graduationyear AS value
    FROM (
      SELECT graduationyear
      FROM alumni
      WHERE graduationyear IS NOT NULL AND TRIM(graduationyear) <> ''  -- Exclude blank and null values
      GROUP BY graduationyear
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_graduation_year

    UNION ALL

    -- Total Number of Alumni
    SELECT 'Total Number of Alumni' AS metric, COUNT(DISTINCT alumniid) AS value
    FROM alumni;
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

router.get('/getModeEmployment', (req, res) => {
  // SQL query to get the mode values for various columns in the employmentdata table
  const query = `
    -- Mode Presently Employed
    SELECT 'Mode Presently Employed' AS metric, presentlyemployed AS value
    FROM (
      SELECT presentlyemployed
      FROM employmentdata
      WHERE presentlyemployed IS NOT NULL AND TRIM(presentlyemployed) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(presentlyemployed)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_presentlyemployed

    UNION ALL

    -- Mode Employment Status
    SELECT 'Mode Employment Status' AS metric, presentemploystatus AS value
    FROM (
      SELECT presentemploystatus
      FROM employmentdata
      WHERE presentemploystatus IS NOT NULL AND TRIM(presentemploystatus) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(presentemploystatus)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_presentemploystatus

    UNION ALL

    -- Mode Occupation
    SELECT 'Mode Occupation' AS metric, presentoccupation AS value
    FROM (
      SELECT presentoccupation
      FROM employmentdata
      WHERE presentoccupation IS NOT NULL AND TRIM(presentoccupation) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(presentoccupation)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_presentoccupation

    UNION ALL

    -- Mode Line of Business
    SELECT 'Mode Line of Business' AS metric, lineofbusiness AS value
    FROM (
      SELECT lineofbusiness
      FROM employmentdata
      WHERE lineofbusiness IS NOT NULL AND TRIM(lineofbusiness) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(lineofbusiness)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_lineofbusiness

    UNION ALL

    -- Mode Place of Work
    SELECT 'Mode Place of Work' AS metric, placeofwork AS value
    FROM (
      SELECT placeofwork
      FROM employmentdata
      WHERE placeofwork IS NOT NULL AND TRIM(placeofwork) <> ''  -- Exclude blank and null values
      GROUP BY LOWER(placeofwork)  -- Normalize case here
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) AS mode_placeofwork;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.log("ERROR GET MODE EMPLOYMENT", err);
      res.status(400).json({ message: 'Error fetching mode employment values' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getCounts', (req, res) => {
  const query = `
    -- Count of Sex
    SELECT 'Sex' AS category, sex AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(sex) AS sex
        FROM generalinformation
        WHERE sex IS NOT NULL AND TRIM(sex) <> '' 
        GROUP BY LOWER(sex)
    ) AS sex_counts
    GROUP BY sex

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

    UNION ALL

    -- Count of Civil Status
    SELECT 'Civil Status' AS category, civilstatus AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(civilstatus) AS civilstatus
        FROM generalinformation
        WHERE civilstatus IS NOT NULL AND TRIM(civilstatus) <> '' 
        GROUP BY LOWER(civilstatus)
    ) AS civilstatus_counts
    GROUP BY civilstatus

    UNION ALL

    -- Count of Region
    SELECT 'Region' AS category, region AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(region) AS region
        FROM generalinformation
        WHERE region IS NOT NULL AND TRIM(region) <> ''  
        GROUP BY LOWER(region)
    ) AS region_counts
    GROUP BY region

    UNION ALL

    -- Count of Province
    SELECT 'Province' AS category, province AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(province) AS province
        FROM generalinformation
        WHERE province IS NOT NULL AND TRIM(province) <> ''  
        GROUP BY LOWER(province)
    ) AS province_counts
    GROUP BY province

    UNION ALL

    -- Count of Residence
    SELECT 'Residence' AS category, residence AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(residence) AS residence
        FROM generalinformation
        WHERE residence IS NOT NULL AND TRIM(residence) <> ''  
        GROUP BY LOWER(residence)
    ) AS residence_counts
    GROUP BY residence

    UNION ALL

    -- Count of Graduation Year
    SELECT 'Graduation Year' AS category, graduationyear AS value, COUNT(*) AS count
    FROM alumni
    WHERE graduationyear IS NOT NULL AND TRIM(graduationyear) <> '' 
    GROUP BY graduationyear;
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


router.get('/getEmploymentCounts', (req, res) => {
  // SQL query to get counts for various employment categories
  const query = `
    -- Count of Presently Employed
    SELECT 'Presently Employed' AS category, presentlyemployed AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(presentlyemployed) AS presentlyemployed
        FROM employmentdata
        WHERE presentlyemployed IS NOT NULL AND TRIM(presentlyemployed) <> ''  -- Exclude blank and null values
        GROUP BY LOWER(presentlyemployed)
    ) AS presentlyemployed_counts
    GROUP BY presentlyemployed

    UNION ALL

    -- Count of Employment Status
    SELECT 'Employment Status' AS category, presentemploystatus AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(presentemploystatus) AS presentemploystatus
        FROM employmentdata
        WHERE presentemploystatus IS NOT NULL AND TRIM(presentemploystatus) <> ''  -- Exclude blank and null values
        GROUP BY LOWER(presentemploystatus)
    ) AS presentemploystatus_counts
    GROUP BY presentemploystatus

    UNION ALL

    -- Count of Occupation
    SELECT 'Occupation' AS category, presentoccupation AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(presentoccupation) AS presentoccupation
        FROM employmentdata
        WHERE presentoccupation IS NOT NULL AND TRIM(presentoccupation) <> ''  -- Exclude blank and null values
        GROUP BY LOWER(presentoccupation)
    ) AS presentoccupation_counts
    GROUP BY presentoccupation

    UNION ALL

    -- Count of Line of Business
    SELECT 'Line of Business' AS category, lineofbusiness AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(lineofbusiness) AS lineofbusiness
        FROM employmentdata
        WHERE lineofbusiness IS NOT NULL AND TRIM(lineofbusiness) <> ''  -- Exclude blank and null values
        GROUP BY LOWER(lineofbusiness)
    ) AS lineofbusiness_counts
    GROUP BY lineofbusiness

    UNION ALL

    -- Count of Place of Work
    SELECT 'Place of Work' AS category, placeofwork AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(placeofwork) AS placeofwork
        FROM employmentdata
        WHERE placeofwork IS NOT NULL AND TRIM(placeofwork) <> ''  -- Exclude blank and null values
        GROUP BY LOWER(placeofwork)
    ) AS placeofwork_counts
    GROUP BY placeofwork;

  `;

  db.query(query, (err, results) => {
    if (err) {
      console.log("ERROR GETTING EMPLOYMENT COUNTS", err);
      res.status(400).json({ message: 'Error fetching employment counts' });
    } else {
      res.json(results);
    }
  });
});


module.exports = router;
