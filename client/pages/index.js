import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

const Index = ({ courses }) => {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
  //   fetchCourses();
  // }, []); <div className="login-box ">

  return (
    <>
     <div className="homepage-bgimage repeat">
        <div className="col-md-4 offset-md-4 pb-5"></div>
      <h1 className=" text-center">
        Online Courses
      </h1>
      <div className="container col-md-8 row-md-10 ">
        <div className="row ">
          {courses.map((course) => (
            <div key={course._id} className="col-md-6  center">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
