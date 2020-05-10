const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createPost = async function(req,res){
    try{
        let post = await Post.create({
            user:req.user,
            content:req.body.post
        });

        if(req.xhr){
            return res.status(200).send({
                data:{
                    post:post
                },
                message:"post has been published"
            })
        }
        res.redirect('back');
    }
    catch(err){
        //console.log(err);
        return res.redirect('back');
    }
}

module.exports.single_post = async function(req,res){
    try{
        let post = await Post.findById(req.params.id)
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
   
        res.render('single_post.ejs',{
            post
        });
    }
    catch(err){
        //console.log(err,"Inside single post");
        res.redirect('back');
    }
}

module.exports.deletePost = async function(req,res){
    //console.log(req.params);
    try{
        let post = await Post.findById(req.params.id);
        console.log(post)
        await Comment.deleteMany({
            post:post.id
        })
        post.delete();
        
        res.redirect('/');
    }
    catch(err){
        console.log(err);
        res.redirect('back');
    }
}