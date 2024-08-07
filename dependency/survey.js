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
  const query = `SELECT g.*, a.alumniid, a.name
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
  const query = `SELECT e.*, a.alumniid, a.name
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
  const query = `SELECT t.*, a.alumniid, a.name
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
  const query = `SELECT e.*, a.alumniid, a.name
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
  const query = `SELECT c.*, a.alumniid, a.name
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

module.exports = router;
