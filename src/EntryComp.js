import React from 'react';
import moment from 'moment';
import { Link} from 'react-router-dom';
import styled from 'styled-components';

const EntryArticle = styled.article`
border: 1px solid black;
border-radius: 4px;
padding: 1em;
`;

const Photoset = styled.div`
img {
max-width: 12em;
}
`;

export const EntryComp = ({entry}) => (
  <EntryArticle>
    <h2><Link to={`/entries/${entry.objectID}`}>{entry.title || "MISSING"}</Link></h2>
    <p dangerouslySetInnerHTML={{__html: entry.body}}/>
    <Photoset>
      {entry.photos && entry.photos.map(({caption, url}) => (
        <img key={url} alt={caption} src={url}/>
      ))}
    </Photoset>
    <ul>{entry.tags && entry.tags.map(tag => (<li key={tag}>{tag}</li>))}</ul>
    <time dateTime={entry.posted}>{moment(entry.posted).format("LLL")}</time>
  </EntryArticle>
);
