import React from 'react';
import moment from 'moment';
import { Link} from 'react-router-dom';
import styled from 'styled-components';

const EntryHeader = styled.h2`
  margin: 0em;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const EntryArticle = styled.article`
  border: 1px solid #00000070;
  border-radius: 4px;
  padding: 1em;
  margin-bottom: 2em;
  background-color: white;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Photoset = styled.div`
  img {
    max-height: 12em;
  }
`;

const TagSet = styled.ul`
  list-style-type: none;
  margin: 0.5em 0em;
  padding: 0;
`;

const Tag = styled.li`
  display: inline;
  border-radius: 4px;
  background-color: #cc97f6;
  color: white;
  padding: 0.2em 0.4em;
  margin: 0em 0.1em;
`;

const PostedStyle = styled.time`
  margin: 0.5em 0em;
  display: block;
`;

const Posted = ({datetime}) =>
      (<PostedStyle dateTime={datetime}>{moment(datetime).format("LLL")}</PostedStyle>);

export const EntryComp = ({entry}) => (
  <EntryArticle>
    <EntryHeader><Link to={`/entries/${entry.objectID}`}>{entry.title || "MISSING"}</Link></EntryHeader>
    <p dangerouslySetInnerHTML={{__html: entry.body}}/>
    <Photoset>
      {entry.photos && entry.photos.map(({caption, url}) => (
        <img key={url} alt={caption} src={url}/>
      ))}
    </Photoset>
    <TagSet>{entry.tags && entry.tags.map(tag => (<Tag key={tag}>{tag}</Tag>))}</TagSet>
    <Posted datetime={entry.posted} />
  </EntryArticle>
);
