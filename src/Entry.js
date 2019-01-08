import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from './Card';
import Tag from './Tag';

const EntryHeader = styled.h2`
  margin: 0em;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const Photo = styled.img`
  max-height: 12em;
`;

const Photoset = styled.div`
display: flex;
flex-wrap wrap;
`;

const TagSet = styled.ul`
  list-style-type: none;
  margin: 0.5em 0em;
  padding: 0;
`;

const PostedStyle = styled.time`
  margin: 0.5em 0em;
  display: block;
`;

const Posted = ({datetime}) =>
      (<PostedStyle dateTime={datetime}>{moment(datetime).format("LLL")}</PostedStyle>);

const Entry = ({entry, className}) => (
  <Card as="article" className={className}>
    <EntryHeader>
      <Link to={`/entries/${entry.objectID}`}>
        {entry.title || "MISSING"}
      </Link>
    </EntryHeader>
    <p dangerouslySetInnerHTML={{__html: entry.body}}/>
    <Photoset>
      {entry.photos && entry.photos.map(({caption, url}) => (
        <Photo key={url} alt={caption} src={url}/>
      ))}
    </Photoset>
    <TagSet>{entry.tags && entry.tags.map(tag => (<Tag as="li" key={tag}>{tag}</Tag>))}</TagSet>
    <Posted datetime={entry.posted} />
  </Card>
);

export default Entry;
