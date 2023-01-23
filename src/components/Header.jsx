import React, { useRef } from 'react';
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

  const headerContainerRef = useRef();

  const scrollToForm = () => {
    const headerHeight = headerContainerRef.current.offsetHeight;
    const destination = headerHeight + 175.46;
    window.scrollTo({
      top: destination,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="header-container" ref={headerContainerRef}>
        <div className="slogan-container">
          <h2>There is no one</h2>
          <h2>who loves pain</h2>
        </div>
        <div className="btn-goToForm" onClick={scrollToForm}>
          <img src="/assets/images/form.svg" alt="go-to-form" />
        </div>
        <div className="container paragraphs-container">
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
