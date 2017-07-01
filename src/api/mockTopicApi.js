import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const topics = [{
  id: "week-01",
  title: "Html, Git, and CSS"
}, {
  id: "week-02",
  title: "GitHub Pages, External CSS, Intro to Bootstrap"
}, {
  id: "week-03",
  title: "JavaScript"
}, {
  id: "week-04",
  title: "jQuery"
}, {
  id: "week-05",
  title: "JavaScript II"
}];

class TopicApi {
  static getAllTopics() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], topics));
      }, delay);
    });
  }

  static saveTopic(topic) {
    topic = Object.assign({}, topic); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTopicTitleLength = 1;
        if (topic.title.length < minTopicTitleLength) {
          reject(`Title must be at least ${minTopicTitleLength} characters.`);
        }

        if (topic.id) {
          const existingTopicIndex = topics.findIndex(a => a.id == topic.id);
          topics.splice(existingTopicIndex, 1, topic);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          // course.id = generateId(course);
          // course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          topics.push(topic);
        }

        resolve(topic);
      }, delay);
    });
  }

  static deleterTopic(topicId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTopicToDelete = topics.findIndex(topic => {
          topic.id == topicId;
        });
        topics.splice(indexOfTopicToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TopicApi;