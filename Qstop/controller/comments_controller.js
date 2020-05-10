const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = async function(req,res){
    
    try{
       let post = await Post.findById(req.body.post);
       //console.log(post);
       if(post==null || post == undefined){
           res.redirect('back');
       }
       let comment = await Comment.create({
           content:req.body.content,
           user:req.user.id,
           post:post.id
       })

       await post.comments.push(comment);
       await post.save();
       
       res.redirect('back');
    }
    catch(err){
        res.redirect('back');
    }
}


module.exports.delete = async function(req,res){
    try{
        //console.log(req.params.id)
        let comment = await Comment.findById(req.params.id);
        //console.log(comment.user._id , req.user.id)
        if(comment.user._id == req.user.id){
            let postId = comment.post.id;
            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            await comment.remove();
            //await comment.save();
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
        
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}