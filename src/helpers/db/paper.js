import { join } from 'path';
import { Low, JSONFile } from 'lowdb';
const file = join('./', '.db/paper.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
const Paper = {
    async saveExam(examDetail) {
        console.log('saveExam', file, examDetail);
        try {
            const { examId, questionDetail } = examDetail;
            await db.read();
            if (!db.data) {
                db.data = { exams: {} };
            }
            const dbExamDetail = db.data.exams[examId] || null;
            if (!dbExamDetail) {
                db.data.exams[examId] = {
                    questionDetail,
                    examId,
                };
            } else {
                // 合并数据
                Object.assign(
                    db.data.exams[examId].questionDetail,
                    questionDetail
                );
            }
            await db.write();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async getExam(examId) {
        if (!examId) {
            return;
        }
        await db.read();
        if (!db.data) {
            db.data = { exams: {} };
        }
        const { exams } = db.data;
        return exams[examId];
    },
};
export default Paper;
