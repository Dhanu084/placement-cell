{
    let createComment = function(){
        let newCommentForm = $('#form-div');
        console.log(newCommentForm);
        newCommentForm.submit(function(e){
            e.preventDefault();
        })
    }

    createComment();
}