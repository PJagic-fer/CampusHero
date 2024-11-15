import React, { useEffect, useState } from 'react'
import './guides_forum.css'

const posts = [
    { title: "Kuhinja ima dobre stvari", subtitle: "stvari su u kuhinji dobre bla bla bla bla bla bla ", authorImage: null, views: 422, time: null, NoComments: 689},
    { title: "kuhinja nema stvari", subtitle: "stvari nisu u kuhinji", authorImage: null, views: 42, time: null, NoComments: 6}
];

export default function PostCard({ title, subtitle, authorImage, views, time, NoComments }) {
    return (
        <div className="postCard">
            <div className="postCardHeader">
                <img src={authorImage} alt="Author" className="authorImage"/>
                <div className="postInfo">
                    <h3 className="postTitle">{title}</h3>
                    <p className="postSubtitle">{subtitle}</p>
                </div>
            </div>
            <div className="postCardFooter">
                <div className="postComments">
                    <span className="commentCount">{NoComments} komentara</span>
                </div>
                <div className="postStats">
                    <span className="views">{views} pregleda</span>
                    <span className="time">{time}</span>
                </div>
            </div>
        </div>
    );
}

function guides_forum() {
    return (
        <div>
            {posts.map((post, index) => (
                <PostCard 
                    key={index}
                    title={post.title}
                    subtitle={post.subtitle}
                    authorImage={post.authorImage}
                    views={post.views}
                    time={post.time}
                    NoComments={post.NoComments}
                />
            ))}
        </div>
    );
}

