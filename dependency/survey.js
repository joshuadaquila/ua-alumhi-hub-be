const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/submitSurvey', (req, res) => {
  const userId = req.userId;
  const { contactNum, mobileNum, civilStat, sex, region, province, residence,
    educationalAttain, professionalExams, undergraduateReasons, graduateReasons,
    trainings, reasonAdvanceStud, presentlyEmployed, reasonUnemployed, presentEmployStat, skillsAcquired, presentOccupation, majorLine, placeOfWork, firstJobAfterJob, 
    reasonStayingJob, firstJobRelatedToCourse, reasonAcceptingJob, reasonChangingJob, durationFirstJob, howFindFirstJob, durationJobSeeking, firstJobLvl,
    secondJobLvl, earning, curriculumRelevance, competencies, suggestion, 
    awardName, awardBody, date, selectedFiles } = req.body;

  const queries = [];

  // General Information Query
  const generalInfoSql = `INSERT INTO generalinformation 
  (alumniid, telnumber, mobilenum, civilstatus, sex, region, province, residence) VALUES (?,?,?,?,?,?,?,?)`;
  queries.push(new Promise((resolve, reject) => {
    db.query(generalInfoSql, [userId, contactNum, mobileNum, civilStat, sex, region, province, residence], (err, result) => {
      if (err) {
        return reject(new Error('GENINFO: ' + err.message));
      }
      resolve(result);
    });
  }));

  // Educational Background Query
  const educAttainJson = JSON.stringify(educationalAttain);
  const profExamJson = JSON.stringify(professionalExams);
  const undergradReasJson = JSON.stringify(undergraduateReasons);
  const gradReasJson = JSON.stringify(graduateReasons);

  const educationalBackgroundSql = `INSERT INTO educationalbackground 
  (alumniid, educattain, exampassed, reasonundergrad, reasongrad) VALUES (?,?,?,?,?)`;
  queries.push(new Promise((resolve, reject) => {
    db.query(educationalBackgroundSql, [userId, educAttainJson, profExamJson, undergradReasJson, gradReasJson], (err, result) => {
      if (err) {
        return reject(new Error('EDUC: ' + err.message));
      }
      resolve(result);
    });
  }));

  // Training Query
  const trainingJson = JSON.stringify(trainings);
  const reasAdvanStudJson = JSON.stringify(reasonAdvanceStud);

  const trainingSql = `INSERT INTO training 
  (alumniid, trainingtitle, reason) VALUES (?,?,?)`;
  queries.push(new Promise((resolve, reject) => {
    db.query(trainingSql, [userId, trainingJson, reasAdvanStudJson], (err, result) => {
      if (err) {
        return reject(new Error('TRAINING: ' + err.message));
      }
      resolve(result);
    });
  }));

  // Employment Data Query
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
  queries.push(new Promise((resolve, reject) => {
    db.query(employmentDataSql, [userId, presentlyEmployed, reasUnemJson, presentEmployStat, skillsAcquired, presentOccupation, majorLine, placeOfWork,
      firstJobAfterJob, reasStayJson, firstJobRelatedToCourse, reasAccJson, reasChanJson, durationFirstJob, howFindFJobJson, durationJobSeeking, 
      firstJobLvl, secondJobLvl, earning, curriculumRelevance, compJson, suggestion], (err, result) => {
      if (err) {
        return reject(new Error('EMPLOY: ' + err.message));
      }
      resolve(result);
    });
  }));

  // Contribution Profile Query
  const selectFilesJson = JSON.stringify(selectedFiles);

  const contributionProfileSql = `INSERT INTO contributionprofile 
  (alumniid, awardname, awardbody, date, certificate) VALUES (?,?,?,?,?)`;
  queries.push(new Promise((resolve, reject) => {
    db.query(contributionProfileSql, [userId, awardName, awardBody, date, selectFilesJson], (err, result) => {
      if (err) {
        return reject(new Error('CONTRI: ' + err.message));
      }
      resolve(result);
    });
  }));

  // Execute all queries and handle response
  Promise.all(queries)
    .then(results => {
      res.json({ message: 'All data inserted successfully', results });
    })
    .catch(error => {
      console.error(error.message);
      res.status(500).send(error.message);
    });
});

module.exports = router;
