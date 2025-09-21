"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Users, Star } from "lucide-react";

const PopularCourses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(5);

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      instructor: "John Smith",
      duration: "12 weeks",
      students: "2,450",
      rating: 4.8,
      price: "$299",
      level: "Beginner",
      description: "Learn modern web development with React, Node.js, and MongoDB. Build real-world projects."
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      instructor: "Sarah Johnson",
      duration: "8 weeks",
      students: "1,890",
      rating: 4.7,
      price: "$199",
      level: "Intermediate",
      description: "Master SEO, social media marketing, and Google Ads to grow your business online."
    },
    {
      id: 3,
      title: "Data Science with Python",
      instructor: "Dr. Michael Chen",
      duration: "16 weeks",
      students: "3,250",
      rating: 4.9,
      price: "$399",
      level: "Advanced",
      description: "Analyze data, build machine learning models, and create visualizations with Python."
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: "Emily Rodriguez",
      duration: "10 weeks",
      students: "1,680",
      rating: 4.6,
      price: "$249",
      level: "Beginner",
      description: "Design beautiful and user-friendly interfaces using Figma and design principles."
    },
    {
      id: 5,
      title: "Project Management Professional",
      instructor: "David Wilson",
      duration: "6 weeks",
      students: "2,120",
      rating: 4.8,
      price: "$179",
      level: "Intermediate",
      description: "Learn agile methodologies and earn your PMP certification with hands-on practice."
    },
  ];

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(4);
      } else {
        setItemsPerView(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const maxIndex = Math.max(0, courses.length - itemsPerView);
  const visibleCourses = courses.slice(currentIndex, currentIndex + itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1A2F5F] to-[#4A72D0] mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-gray-600">Advance your career with our top-rated courses...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(itemsPerView)].map((_, i) => (
              <div key={i} className="bg-white/80 rounded-xl shadow-md p-6 animate-pulse border border-gray-200">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1A2F5F] to-[#4A72D0] mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-gray-600">
            Advance your career with our top-rated courses designed by industry experts.
          </p>
        </div>

        {/* Course Cards */}
        <div className="relative">
          {/* Navigation */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg ${
              currentIndex === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-50"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg ${
              currentIndex >= maxIndex
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-50"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {visibleCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg border border-gray-200 transition hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="bg-[#C48CB3] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {course.price}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-3">by {course.instructor}</p>

                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {course.duration}</span>
                  <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> {course.students}</span>
                  <span className="flex items-center"><Star className="w-3 h-3 mr-1 text-yellow-400 fill-yellow-400" /> {course.rating}</span>
                </div>

                <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-3">{course.description}</p>

                <button className="w-full bg-gradient-to-r from-[#4A72D0] to-[#2A4B8C] text-white py-2 rounded-lg hover:from-[#3A5BB0] hover:to-[#1A2F5F] transition font-medium text-sm">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-[#4A72D0]" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
