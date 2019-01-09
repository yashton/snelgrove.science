import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { default as BaseCard } from './Card';
import Tag from './Tag';

const Card = styled(BaseCard)`
  width: 100%;
`;

const Contents = styled.div`
  padding: 0.5em 2.5em 2.5em 2.5em;
`;
const EntryHeader = styled.h2`
  margin: 0em;

background-color: #cc97f6;
color: white;
padding: 1em 1em 1em 2em;
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
  font-style: italic;
`;

const Body = styled.div`
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

    <Contents>
      <Posted datetime={entry.posted} />
      <Body>
        <div dangerouslySetInnerHTML={{__html: entry.body}}/>
      </Body>
      <Photoset>
        {entry.photos && entry.photos.map(({caption, url}) => (
          <Photo key={url} alt={caption} src={url}/>
        ))}
      </Photoset>
      <TagSet>
        {entry.tags && entry.tags.map(
          tag => (<Tag as="li" key={tag}>{tag}</Tag>))}
      </TagSet>
  </Contents>
  </Card>
);

export default Entry;
