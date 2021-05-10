
const express = require('express')
const router = express.Router();

const Posts = require('../model/Posts')

router.post(
    "/posts",
    async (req, res) => {
       console.log('req', req.body)
        const {
            post_id,
            title,
            description,
            user_id
        } = req.body;
        try {
           
            post = new Posts({
                post_id,
                title,
                description,
                user_id
            });

            await post.save()  
            .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Handling POST requests to /posts",
                  createdProduct: result
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.get("/get/:post_id",async (req,res)=> {
  try {
    console.log('post_id :',req.params.post_id)
    const post =await Posts.findById(req.params.post_id);
    res.json(post);
  }
  catch (e) {
    res.send({ message: "Error in Fetching posts" });
  }
});

router.get("/getAll",async (req,res)=> {
  try {
    const post = await Posts.find({});
    res.json(post);
  }
  catch (e) {
    res.send({ message: "Error in Fetching posts" });
  }
});

router.get("/paginate", async (req, res, next) => {
    try {
      const pageSize = 5;
      const currentPage = 1;
      const posts = await Posts.find()
      .skip (pageSize * (currentPage -1))
      .limit ( pageSize);

      const countPosts = await Posts.countDocuments();
      console.log(countPosts)
      res.setHeader("max-records",countPosts)
      res.status(200).json(posts)

    }
    catch (e) {
    res.status(500).json ({ 
      message : e
    });
  }
})

module.exports = router;












