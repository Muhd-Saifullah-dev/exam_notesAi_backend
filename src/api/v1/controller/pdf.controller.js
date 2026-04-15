const PDFDocument = require("pdfkit");
const Responses = require("@constant/responses");
const { startSession } = require("@model/notes.model");
const responses = new Responses();
const pdfDownload = async (req, res, next) => {
  try {
    const { result } = req.body;
    if (!result) {
      return res
        .status(400)
        .json(responses.bad_request_error("No content provided"));
    }
    const doc = new PDFDocument();
    res.status(200);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"',
    );

    doc.pipe(res);

    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Importance: ${result.importance}`);
    doc.moveDown();

    doc.fontSize(16).text("Sub Topics");
    doc.moveDown(0.5);
    Object.entries(result.subTopics).forEach(([star, topics]) => {
      doc.moveDown(0.5);
      doc.fontSize(13).text(`${star} Topics:`);
      topics.forEach((t) => {
        doc.fontSize(12).text(`  • ${t}`);
      });
    });

    doc.moveDown();

    doc.fontSize(16).text("Notes");
    doc.moveDown(0.5);
    doc.fontSize(12).text(result.notes.replace(/[#*]/g, ""));
    doc.moveDown();
    doc.fontSize(16).text("Revision Points");
    doc.moveDown();
    result.revisionPoints.forEach((p) => {
      doc.fontSize(12).text(`  • ${p}`);
    });

    doc.moveDown();

    doc.fontSize(16).text("Important Questions:");
    doc.moveDown();

    doc.fontSize(13).text("Short Questions:");
    result.questions.short.forEach((q) => {
      doc.fontSize(12).text(`  • ${q}`);
    });

    doc.moveDown(0.5);
    doc.fontSize(13).text("Long Questions:");
    result.questions.long.forEach((l) => {
      doc.fontSize(12).text(`  • ${l}`);
    });

    doc.moveDown(0.5);
    doc.fontSize(13).text("Diagram Question:");
    doc.fontSize(12).text(result.questions.diagram);
    doc.end();
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

module.exports = { pdfDownload };
