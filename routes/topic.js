const express = require('express');

const { mwCheckIdParam, mwCheckCreateTopic } = require('../midelware/topic');
const { getAllTopics, getTopicById, createTopic } = require('../controllers/topicController');

const router = express.Router();

router.get('/', getAllTopics);
router.get('/:id', mwCheckIdParam, getTopicById);
router.put('/', mwCheckCreateTopic, createTopic);

module.exports = router;