export default (title,postedBy,content='',tags=[], media=[], communityId='') => {
    return {
        title,
        postedBy,
        communityId,
        content,
        tags,
        media,
        votes: {},
        upvotes: 0,
        downvotes: 0,
        comments: [],
        createdAt: Date.now(),
    }
}