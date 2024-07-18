const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/submitSurvey', (req, res) => {
  const userId = req.userId;
  const { name, permanentAdd, email, contactNum, mobileNum, civilStat, sex, birthday, region, province, residence,
  educationalAttain, professionalExams,  undergraduateReasons, graduateReasons,
  trainings, reasonAdvanceStud,
  presentlyEmployed, reasonUnemployed, presentEmployStat, skillsAcquired, presentOccupation, majorLine, placeOfWork, firstJobAfterJob, 
        reasonStayingJob, firstJobRelatedToCourse, reasonAcceptingJob, reasonChangingJob, durationFirstJob, howFindFirstJob, durationJobSeeking, firstJobLvl,
        secondJobLvl, earning, curriculumRelevance, competencies, suggestion, 
  awardName, awardBody, date, selectedFiles } = req.body;

  
  const sql = `INSERT INTO generalinformation 
  (alumniid, telnumber, mobilenum, civilstatus, sex, region, province, residence) VALUES (?,?,?,?,?,?,?,?)`;
    db.query(sql, [userId, contactNum, mobileNum, civilStat, sex, region, province, residence], (err, result) => {
      if (err) {
        console.error('Error executing query GEN:', err);
        return res.status(500).send('Internal server error');
      }
      console.log("GENINFO OK")
      res.send(result);
    });

  const educAttainJson = JSON.stringify(educationalAttain);
  const profExamJson = JSON.stringify(professionalExams);
  const undergradReasJson = JSON.stringify(undergraduateReasons);
  const gradReasJson = JSON.stringify(graduateReasons);

  const sql2 = `INSERT INTO educationalbackground 
  (alumniid, educattain, exampassed, reasonundergrad, reasongrad) VALUES (?,?,?,?,?)`;
  console.log(sql2);
    db.query(sql2, [userId, educAttainJson, profExamJson, undergradReasJson, gradReasJson], (err, result) => {
      if (err) {
        console.error('Error executing query EDUC:', err);
        return res.status(500).send('Internal server error');
      }
      console.log("EDUC OK");
      res.send(result);
    });

  const trainingJson = JSON.stringify(trainings);
  const reasAdvanStudJson = JSON.stringify(reasonAdvanceStud);

    const sql3= `INSERT INTO training 
  (alumniid, trainingtitle, reason) VALUES (?,?,?)`;
    db.query(sql3, [userId, trainingJson, reasAdvanStudJson], (err, result) => {
      if (err) {
        console.error('Error executing query TRAINING:', err);
        return res.status(500).send('Internal server error');
      }
      console.log("TRAINING OK")
      res.send(result);
    });

  const reasUnemJson = JSON.stringify(reasonUnemployed);
  const reasStayJson = JSON.stringify(reasonStayingJob);
  const reasAccJson = JSON.stringify(reasonStayingJob);
  const reasChanJson = JSON.stringify(reasonChangingJob);
  const howFindFJobJson = JSON.stringify(howFindFirstJob);
  const compJson = JSON.stringify(competencies);
  
    const sql4 = `INSERT INTO employmentdata 
  (alumniid, presentlyemployed, reasonnotemployed, presentemploystatus, skillsaquiredincollege,
    presentoccupation, lineofbusiness, placeofwork, firstjob, reasonstayingonjob, firstjobrelatedtocourse,
    reasonacceptingthejob, reasonchangingjob, firstjobduration, howfoundfirstjob, howlongfoundfirstjob, joblvlposfirstjob, 
    joblvlposcurrentjob, firstjobearning, curriculumrelevance, competencies, suggestions ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.query(sql4, [userId, presentlyEmployed, reasUnemJson, presentEmployStat, skillsAcquired, presentOccupation, majorLine, placeOfWork,
    firstJobAfterJob, reasStayJson, firstJobRelatedToCourse, reasAccJson, reasChanJson, durationFirstJob, howFindFJobJson, durationJobSeeking, 
  firstJobLvl, secondJobLvl, earning, curriculumRelevance, compJson, suggestion], (err, result) => {
      if (err) {
        console.error('Error executing query EMPLOY:', err);
        return res.status(500).send('Internal server error');
      }
      console.log("EMPLOY OK")
      res.send(result);
    });

  const selectFilesJson = JSON.stringify(selectedFiles);

    const sql5 = `INSERT INTO contributionprofile 
  (alumniid, awardname, awardbody, date, certificate) VALUES (?,?,?,?,?)`;
    db.query(sql5, [userId, awardName, awardBody, date, selectFilesJson], (err, result) => {
      if (err) {
        console.error('Error executing query CONTRI:', err);
        return res.status(500).send('Internal server error');
      }
      console.log("CONTRI OK")
      res.send(result);
    });
});

module.exports = router;