let { Quiz, validate } = require('../models/quiz');

exports.get = async (req, res) => {
   const quiz = await Quiz.find();
   res.send(quiz);
}

exports.getById = async (req, res) => {
   const quiz = await Quiz.findById(req.params.id);
   if (!quiz) return res.status(404).send('The Quiz with the given ID was not found.');
   res.send(quiz);
}

exports.getBySubjectId = async (req, res) => {
   const quiz = await Quiz.
      find({subject: req.params.id});
   if (!quiz) return res.status(404).send('The Subject with the given ID was not found.');
   res.send(quiz);
}

exports.add = async (req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let quiz = new Quiz({
      name: req.body.name,
      isActive: req.body.isActive,
      description: req.body.description,
      displayOrder: req.body.displayOrder,
      subject: req.body.subjectId
   });
   quiz = await quiz.save();
   res.send(quiz);
};

exports.update = async (req, res) => {

   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const quiz = await Quiz.findById(req.params.id)
   if (!quiz) return res.status(404).send('The Quiz with the given ID was not found.');

   if (req.body._id) {
      delete req.body._id
   }

   //p : property
   Object.entries(req.body).forEach((p) => {
      const key = p[0];
      const value = p[1];
      quiz[key] = value
   })

   try {
      quiz = await quiz.save();
      res.send(quiz);

   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
};

exports.delete = async (req, res) => {
   const quiz = await Quiz.findByIdAndRemove(req.params.id);
   if (!quiz) return res.status(404).send('The Quiz with the given ID was not found.');
   res.send(quiz);
};