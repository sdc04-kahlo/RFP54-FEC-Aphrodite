/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const Answer = ({ answer }) => {
  const [helpfulCounter, setHepfulCounter] = useState(answer.helpfulness);
  const [helped, setHelped] = useState(false);
  const [reported, setReported] = useState(false);

  const markHelpful = () => {
    axios.put('/answer/helpful')
      .then(() => {
        setHepfulCounter(helpfulCounter + 1);
        setHelped(true);
      });
  };

  const reportAnswer = () => {
    axios.put('/answer/report')
      .then(() => {
        setReported(true);
        alert('This answer has been reported and marked for review');
      });
  };

  const renderHelpfulButton = () => {
    if (!helped) {
      return (
        <a className="qa-link" onClick={markHelpful}>Yes</a>
      );
    }
    return 'Thanks!';
  };

  const renderReportButton = () => {
    if (!reported) {
      return (
        <a className="qa-link" onClick={reportAnswer}>Report</a>
      );
    }
    return 'Reported';
  };

  return (
    <>
      <div className="individual-answer-container">
        <div className="answer">
          <b>A: </b> {answer.body}
        </div>
        <div className="answer-photos">
          {answer.photos.map((photo) => (
            <div className="photo-thumbnail" key={photo.id}>
              <img className="photo-img" src={photo.url} alt="image" />
            </div>
          ))}
        </div>
        <div className="individual-answer-sub-container">
          <span className="individual-answer-name-date">
            by {answer.answerer_name}, {moment(answer.date).format('LL')}
          </span>
          <span className="divider"> | </span>
          <span className="helpful">
            Helpful?
          </span>
          {renderHelpfulButton()} ({helpfulCounter})
          <span className="divider"> | </span>
          {renderReportButton()}
        </div>
      </div>
    </>
  );
};

export default Answer;
