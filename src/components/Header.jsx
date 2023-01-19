import React from 'react';
import { nanoid } from 'nanoid';
import Paragraph from './Paragraph';

const Header = () => {
  const paragraphs = [
    ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
    [
      {
        plainText: 'Quisque sodales leo',
        styledText: (
          <span style={{ borderBottom: '1px solid #204379' }}>
            <b> vitae vulputate auctor.</b>
          </span>
        ),
      },
      'Proin ac justo ut nisl tincidunt imperdiet.Maecenas viverra libero a pellentesque blandit.',
      'Cras tristique tellus id leo bibendum, eu dapibus nisl accumsan.',
      {
        plainText: 'Donec ultrices sapien',
        styledText: (
          <span>
            <b> vitae leo venenatis ullamcorper.</b>
          </span>
        ),
      },
    ],
  ];

  return (
    <>
      <div className="header-container">
        <div className="slogan-container">
          <h2>There is no one</h2>
          <h2>who loves pain</h2>
        </div>
        <div className="btn-goToForm">
          <img src="/assets/images/form.svg" alt="go-to-form" />
        </div>
        <div className="paragraphs-container">
          <div className="supBubble-container">
            <img
              src="/assets/images/小泡泡.svg"
              alt="小泡泡"
              className="bubble-sm"
            />
            <img src="/assets/images/泡泡.svg" alt="泡泡" className="bubble" />
            <img src="/assets/images/sup.svg" alt="sup" className="sup" />
            <img src="/assets/images/船槳.svg" alt="船槳" className="oar" />
          </div>
          {paragraphs.map((content, index) =>
            index !== paragraphs.length - 1 ? (
              <Paragraph key={nanoid()} contents={content} />
            ) : (
              <Paragraph
                key={nanoid()}
                contents={content}
                style={{ marginBottom: '0', lineHeight: '180%' }}
              />
            )
          )}
          <div className="supFirework-container">
            <img
              src="/assets/images/sup煙火.svg"
              alt="sup煙火"
              className="supFirework"
            />
            <img
              src="/assets/images/煙火.svg"
              alt="煙火"
              className="firework"
            />
          </div>
        </div>
      </div>
      <div className="wave" />
    </>
  );
};

export default Header;
