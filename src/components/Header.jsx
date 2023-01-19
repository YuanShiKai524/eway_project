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
    <div className="header-container">
      <div className="slogan-container">
        <h2>There is no one</h2>
        <h2>who loves pain</h2>
      </div>
      <div className="btn-goToForm">
        <img src="/assets/images/buttons/form.png" alt="go-to-form" />
      </div>
      <div className="paragraphs-container">
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
      </div>
    </div>
  );
};

export default Header;
