const BlogModel = require("../models/Blog")

class BlogController {

    static fetchAll = async(req,res) => {
        try {
            const data = await BlogModel.find().sort({ _id: -1 })
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchSingle = async(req,res) => {
        try {
            const data = await BlogModel.findById(req.params.id)
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static store = async(req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.file);
            const {title, description, user} = req.body
            const file = req.file.path

            const data = new BlogModel({
                title: title,
                description: description,
                file: file,
                user: user
            })

            await data.save()
            res.status(201).json({ 'status': 'success', 'message': 'Blog Saved Successfully' })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static update = async(req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.file);
            if (req.file != undefined) {
                var {title, description} = req.body
                var file = req.file.path
    
                var data = await BlogModel.findByIdAndUpdate(req.params.id, {
                    title: title,
                    description: description,
                    file: file,
                })
            } else {
                var {title, description} = req.body
    
                var data = await BlogModel.findByIdAndUpdate(req.params.id, {
                    title: title,
                    description: description,
                })
            }

            await data.save()
            res.status(201).json({ 'status': 'success', 'message': 'Blog Updated Successfully' })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static delete = async(req,res) => {
        try {
            const deleteProject = await BlogModel.findByIdAndDelete(req.params.id)

            if (deleteProject) {
                res.status(201).json({ 'status': 'success', 'message': 'Blog Deleted Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

}
module.exports = BlogController