const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/submitGeneralInfo', (req, res) => {
  const userId = req.userId;
  const { contactNum, mobileNum, civilStat, sex, region, province, residence } = req.body;

  const checkIfExistsSql = `SELECT * FROM generalinformation WHERE alumniid = ?`;
  const updateSql = `UPDATE generalinformation SET telnumber = ?, mobilenum = ?, civilstatus = ?, sex = ?, region = ?, province = ?, residence = ? WHERE alumniid = ?`;
  const insertSql = `INSERT INTO generalinformation (alumniid, telnumber, mobilenum, civilstatus, sex, region, province, residence) VALUES (?,?,?,?,?,?,?,?)`;

  db.query(checkIfExistsSql, [userId], (err, result) => {
    if (err) {
      console.error('GENINFO: ' + err.message);
      return res.status(500).send('Database query error');
    }

    if (result.length > 0) {
      // Record exists, send response first
      res.json({ message: 'Record already exists for this user', recordExists: true, result });

      // Then update the record (optional)
      db.query(updateSql, [contactNum, mobileNum, civilStat, sex, region, province, residence, userId], (err, updateResult) => {
        if (err) {
          console.error('GENINFO UPDATE: ' + err.message);
          return; // Log the error but do not send another response
        }
        console.log('General information updated successfully', updateResult);
      });

    } else {
      // No existing record, insert new one
      db.query(insertSql, [userId, contactNum, mobileNum, civilStat, sex, region, province, residence], (err, insertResult) => {
        if (err) {
          console.error('GENINFO INSERT: ' + err.message);
          return res.status(500).send('Error inserting general information');
        }
        res.json({ message: 'General information inserted successfully', recordExists: false, insertResult });
      });
    }
  });
});


router.post('/submitEducationalBackground', (req, res) => {
  const userId = req.userId;
  const { educationalAttain, professionalExams, undergraduateReasons, graduateReasons } = req.body;

  const educAttainJson = JSON.stringify(educationalAttain);
  const profExamJson = JSON.stringify(professionalExams);
  const undergradReasJson = JSON.stringify(undergraduateReasons);
  const gradReasJson = JSON.stringify(graduateReasons);

  const checkIfExistsSql = `SELECT * FROM educationalbackground WHERE alumniid = ?`;
  const updateSql = `UPDATE educationalbackground SET educattain = ?, exampassed = ?, reasonundergrad = ?, reasongrad = ? WHERE alumniid = ?`;
  const insertSql = `INSERT INTO educationalbackground (alumniid, educattain, exampassed, reasonundergrad, reasongrad) VALUES (?,?,?,?,?)`;

  db.query(checkIfExistsSql, [userId], (err, result) => {
    if (err) {
      console.error('EDUC CHECK: ' + err.message);
      return res.status(500).send('Database query error');
    }

    if (result.length > 0) {
      res.json({ message: 'Record already exists for this user', recordExists: true, result });

      db.query(updateSql, [educAttainJson, profExamJson, undergradReasJson, gradReasJson, userId], (err, updateResult) => {
        if (err) {
          console.error('EDUC UPDATE: ' + err.message);
          return;
        }
        console.log('Educational background updated successfully', updateResult);
      });

    } else {
      db.query(insertSql, [userId, educAttainJson, profExamJson, undergradReasJson, gradReasJson], (err, insertResult) => {
        if (err) {
          console.error('EDUC INSERT: ' + err.message);
          return res.status(500).send('Error inserting educational background');
        }
        res.json({ message: 'Educational background inserted successfully', recordExists: false, insertResult });
      });
    }
  });
});


router.post('/submitTraining', (req, res) => {
  const userId = req.userId;
  const { trainings, reasonAdvanceStud } = req.body;

  const trainingJson = JSON.stringify(trainings);
  const reasAdvanStudJson = JSON.stringify(reasonAdvanceStud);

  const checkIfExistsSql = `SELECT * FROM training WHERE alumniid = ?`;
  const updateSql = `UPDATE training SET trainingtitle = ?, reason = ? WHERE alumniid = ?`;
  const insertSql = `INSERT INTO training (alumniid, trainingtitle, reason) VALUES (?,?,?)`;

  db.query(checkIfExistsSql, [userId], (err, result) => {
    if (err) {
      console.error('TRAINING CHECK: ' + err.message);
      return res.status(500).send('Database query error');
    }

    if (result.length > 0) {
      res.json({ message: 'Record already exists for this user', recordExists: true, result });

      db.query(updateSql, [trainingJson, reasAdvanStudJson, userId], (err, updateResult) => {
        if (err) {
          console.error('TRAINING UPDATE: ' + err.message);
          return;
        }
        console.log('Training data updated successfully', updateResult);
      });

    } else {
      db.query(insertSql, [userId, trainingJson, reasAdvanStudJson], (err, insertResult) => {
        if (err) {
          console.error('TRAINING INSERT: ' + err.message);
          return res.status(500).send('Error inserting training data');
        }
        res.json({ message: 'Training data inserted successfully', recordExists: false, insertResult });
      });
    }
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

  const checkIfExistsSql = `SELECT * FROM employmentdata WHERE alumniid = ?`;
  const updateSql = `UPDATE employmentdata SET presentlyemployed = ?, reasonnotemployed = ?, presentemploystatus = ?, skillsaquiredincollege = ?,
    presentoccupation = ?, lineofbusiness = ?, placeofwork = ?, firstjob = ?, reasonstayingonjob = ?, firstjobrelatedtocourse = ?,
    reasonacceptingthejob = ?, reasonchangingjob = ?, firstjobduration = ?, howfoundfirstjob = ?, howlongfoundfirstjob = ?, joblvlposfirstjob = ?, 
    joblvlposcurrentjob = ?, firstjobearning = ?, curriculumrelevance = ?, competencies = ?, suggestions = ? WHERE alumniid = ?`;
  const insertSql = `INSERT INTO employmentdata 
  (alumniid, presentlyemployed, reasonnotemployed, presentemploystatus, skillsaquiredincollege,
    presentoccupation, lineofbusiness, placeofwork, firstjob, reasonstayingonjob, firstjobrelatedtocourse,
    reasonacceptingthejob, reasonchangingjob, firstjobduration, howfoundfirstjob, howlongfoundfirstjob, joblvlposfirstjob, 
    joblvlposcurrentjob, firstjobearning, curriculumrelevance, competencies, suggestions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  db.query(checkIfExistsSql, [userId], (err, result) => {
    if (err) {
      console.error('EMPLOY CHECK: ' + err.message);
      return res.status(500).send('Database query error');
    }

    if (result.length > 0) {
      res.json({ message: 'Record already exists for this user', recordExists: true, result });

      db.query(updateSql, [presentlyEmployed, reasUnemJson, presentEmployStat, skillsAcquired, presentOccupation, majorLine, placeOfWork,
        firstJobAfterJob, reasStayJson, firstJobRelatedToCourse, reasAccJson, reasChanJson, durationFirstJob, howFindFJobJson, durationJobSeeking, 
        firstJobLvl, secondJobLvl, earning, curriculumRelevance, compJson, suggestion, userId], (err, updateResult) => {
        if (err) {
          console.error('EMPLOY UPDATE: ' + err.message);
          return;
        }
        console.log('Employment data updated successfully', updateResult);
      });

    } else {
      db.query(insertSql, [userId, presentlyEmployed, reasUnemJson, presentEmployStat, skillsAcquired, presentOccupation, majorLine, placeOfWork,
        firstJobAfterJob, reasStayJson, firstJobRelatedToCourse, reasAccJson, reasChanJson, durationFirstJob, howFindFJobJson, durationJobSeeking, 
        firstJobLvl, secondJobLvl, earning, curriculumRelevance, compJson, suggestion], (err, insertResult) => {
        if (err) {
          console.error('EMPLOY INSERT: ' + err.message);
          return res.status(500).send('Error inserting employment data');
        }
        res.json({ message: 'Employment data inserted successfully', recordExists: false, insertResult });
      });
    }
  });
});


router.post('/submitContributionProfile', (req, res) => {
  const userId = req.userId;
  const { awardName, awardBody, date, selectedFiles } = req.body;

  const selectFilesJson = JSON.stringify(selectedFiles);

  const checkIfExistsSql = `SELECT * FROM contributionprofile WHERE alumniid = ?`;
  const updateSql = `UPDATE contributionprofile SET awardname = ?, awardbody = ?, date = ?, certificate = ? WHERE alumniid = ?`;
  const insertSql = `INSERT INTO contributionprofile (alumniid, awardname, awardbody, date, certificate) VALUES (?,?,?,?,?)`;

  db.query(checkIfExistsSql, [userId], (err, result) => {
    if (err) {
      console.error('CONTRI CHECK: ' + err.message);
      return res.status(500).send('Database query error');
    }

    if (result.length > 0) {
      res.json({ message: 'Record already exists for this user', recordExists: true, result });

      db.query(updateSql, [awardName, awardBody, date, selectFilesJson, userId], (err, updateResult) => {
        if (err) {
          console.error('CONTRI UPDATE: ' + err.message);
          return;
        }
        console.log('Contribution profile updated successfully', updateResult);
      });

    } else {
      db.query(insertSql, [userId, awardName, awardBody, date, selectFilesJson], (err, insertResult) => {
        if (err) {
          console.error('CONTRI INSERT: ' + err.message);
          return res.status(500).send('Error inserting contribution profile');
        }
        res.json({ message: 'Contribution profile inserted successfully', recordExists: false, insertResult });
      });
    }
  });
});

router.get('/getSurveyGenInfo', (req, res) => {
  let userId = req.query.userId;
  if (!userId){
    userId = req.userId;
  }
  const query = `SELECT a.alumniid, a.name, g.telnumber, g.mobilenum, g.civilstatus, g.sex, g.region, g.province, g.residence
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
  const query = `SELECT e.educattain, e.exampassed, e.reasonundergrad, e.reasongrad
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
  const userId = req.userId;
  const query = `SELECT t.trainingtitle, t.reason
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
  const query = `SELECT e.presentlyemployed, e.reasonnotemployed, e.presentemploystatus, e.skillsaquiredincollege, e.presentoccupation, e.lineofbusiness, e.placeofwork, e.firstjob,
    e.reasonstayingonjob, e.firstjobrelatedtocourse, e.reasonacceptingthejob, e.reasonchangingjob, e.firstjobduration, e.howfoundfirstjob, e.howlongfoundfirstjob, e.joblvlposfirstjob,
    e.joblvlposcurrentjob, e.firstjobearning, e.curriculumrelevance, e.competencies, e.suggestions
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
  const query = `SELECT c.awardname, c.awardbody, DATE_FORMAT(c.date, '%Y-%m-%d') AS date
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

    -- Count of Job Level Position
    SELECT 'First Job Level Position' AS category, joblvlposfirstjob AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(joblvlposfirstjob) AS joblvlposfirstjob
        FROM employmentdata
        WHERE joblvlposfirstjob IS NOT NULL AND TRIM(joblvlposfirstjob) <> ''  -- Exclude blank and null values
        GROUP BY LOWER(joblvlposfirstjob)
    ) AS joblvlposfirstjob_counts
    GROUP BY joblvlposfirstjob

    UNION ALL

    -- Count of Job Earning
    SELECT 'Job Earning' AS category, firstjobearning AS value, COUNT(*) AS count
    FROM (
        SELECT LOWER(firstjobearning) AS firstjobearning
        FROM employmentdata
        WHERE firstjobearning IS NOT NULL AND TRIM(firstjobearning) <> ''  -- Exclude blank and null values
        GROUP BY LOWER(firstjobearning)
    ) AS firstjobearning_counts
    GROUP BY firstjobearning

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

router.get('/getEducAttainment', (req, res) => {
  // Query for reasongrad
  const queryGrad = `
      SELECT COUNT(educbackid) AS gradCount
      FROM educationalbackground
      WHERE reasongrad LIKE '%"highGrades":true%'
         OR reasongrad LIKE '%"goodGradesHS":true%'
         OR reasongrad LIKE '%"parentInfluence":true%'
         OR reasongrad LIKE '%"peerInfluence":true%'
         OR reasongrad LIKE '%"roleModel":true%'
         OR reasongrad LIKE '%"passionProfession":true%'
         OR reasongrad LIKE '%"immediateEmployment":true%'
         OR reasongrad LIKE '%"statusPrestige":true%'
         OR reasongrad LIKE '%"courseAvailability":true%'
         OR reasongrad LIKE '%"careerAdvancement":true%'
         OR reasongrad LIKE '%"affordableFamily":true%'
         OR reasongrad LIKE '%"attractiveCompensation":true%'
         OR reasongrad LIKE '%"employmentAbroad":true%'
         OR reasongrad LIKE '%"noParticularChoice":true%'
         OR reasongrad LIKE '%"others":true%';
  `;

  // Query for reasonundergrad
  const queryUndergrad = `
      SELECT COUNT(educbackid) AS undergradCount
      FROM educationalbackground
      WHERE reasonundergrad LIKE '%"highGrades":true%'
         OR reasonundergrad LIKE '%"goodGradesHS":true%'
         OR reasonundergrad LIKE '%"parentInfluence":true%'
         OR reasonundergrad LIKE '%"peerInfluence":true%'
         OR reasonundergrad LIKE '%"roleModel":true%'
         OR reasonundergrad LIKE '%"passionProfession":true%'
         OR reasonundergrad LIKE '%"immediateEmployment":true%'
         OR reasonundergrad LIKE '%"statusPrestige":true%'
         OR reasonundergrad LIKE '%"courseAvailability":true%'
         OR reasonundergrad LIKE '%"careerAdvancement":true%'
         OR reasonundergrad LIKE '%"affordableFamily":true%'
         OR reasonundergrad LIKE '%"attractiveCompensation":true%'
         OR reasonundergrad LIKE '%"employmentAbroad":true%'
         OR reasonundergrad LIKE '%"noParticularChoice":true%'
         OR reasonundergrad LIKE '%"others":true%';
  `;

  // Execute both queries
  db.query(queryGrad, (errGrad, resultGrad) => {
      if (errGrad) {
          return res.status(500).send('Error executing query for reasongrad: ' + errGrad);
      }

      db.query(queryUndergrad, (errUndergrad, resultUndergrad) => {
          if (errUndergrad) {
              return res.status(500).send('Error executing query for reasonundergrad: ' + errUndergrad);
          }

          // Send the results as a JSON response
          res.json({
              gradCount: resultGrad[0].gradCount,
              undergradCount: resultUndergrad[0].undergradCount
          });
      });
  });
});


router.get('/getTotalAwardee', (req, res) => {
  const query = `
  SELECT COUNT(contributionid) as totalawardee
  FROM contributionprofile;
`;

  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getTotalAlumni', (req, res) => {
  const query = `
  SELECT COUNT(alumniid) as totalalumni
  FROM alumni;
`;

  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getYearProgram', (req, res) => {
  const query = `
  SELECT graduationyear, program, COUNT(*) AS count
  FROM alumni
  WHERE status = 'active'
  GROUP BY graduationyear, program
  ORDER BY graduationyear, count DESC;

`;

  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});
module.exports = router;
