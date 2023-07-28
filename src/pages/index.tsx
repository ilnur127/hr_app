import { Routes, Route } from 'react-router-dom'

// import { InterviewList } from './interviewList';
import { InterviewDetail } from './interviewDetail'

export const Pages = () => (
  <Routes>
    {/* <Route path="/" element={<InterviewList />} /> */}
    {/* <Route path="/:interviewId" element={<InterviewDetail />} /> */}
    <Route path="/" element={<InterviewDetail />} />
  </Routes>
)
