import React from 'react';
import { nanoid } from 'nanoid';

const Paragraph = ({ contents, style }) => {
  return (
    <div className="paragraph">
      <div className="title">
        <img src="/assets/images/cactus.svg" alt="cactus" />
        <h5>paragraph</h5>
        <img src="/assets/images/cactus.svg" alt="cactus" />
      </div>
      <ol start="1" style={style || {}}>
        {contents.map((content) => {
          if (typeof content !== 'object') {
            return <li key={nanoid()}>{content}</li>;
          }
          return (
            <li key={nanoid()}>
              {content.plainText}
              {content.styledText}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Paragraph;
