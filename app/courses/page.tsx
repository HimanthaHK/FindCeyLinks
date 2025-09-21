"use client"
import PopularCourses from '@/components/courselist';
import { useState } from 'react';

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All Courses' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'new', label: 'Newest' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'advanced', label: 'Advanced' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0F1E45] via-[#1A2F5F] to-[#0A1530] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#4A72D0]/10 to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C48CB3]/10"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#4A72D0]/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center mb-3">
              <div className="w-12 h-0.5 bg-[#C48CB3] mr-3"></div>
              <span className="text-[#C48CB3] font-medium uppercase tracking-wider text-sm">Career Advancement</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-5 leading-tight">
              Master In-Demand Skills with <span className="text-[#C48CB3]">Expert-Led</span> Courses
            </h1>
            
            <p className="text-xl mb-10 text-white/90 leading-relaxed max-w-3xl">
              Build career-relevant skills with courses designed by industry leaders from top companies. 
              Learn at your own pace with expert mentorship and hands-on projects.
            </p>
            
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, topics, or instructors..."
                className="w-full py-4 pl-12 pr-40 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4A72D0] shadow-lg"
              />
              <button className="absolute right-2 top-2 bg-gradient-to-r from-[#4A72D0] to-[#3A5BB0] hover:from-[#3A5BB0] hover:to-[#2A4B8C] text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                Search Courses
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="text-sm text-white/80">Trending searches:</span>
              <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition">Data Science</button>
              <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition">Web Development</button>
              <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition">UX Design</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section with improved design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg hover:border-[#4A72D0]/20">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#4A72D0]/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4A72D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#4A72D0]">200+</div>
                <div className="text-gray-600 font-medium">Courses Available</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg hover:border-[#C48CB3]/20">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C48CB3]/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#C48CB3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#C48CB3]">98%</div>
                <div className="text-gray-600 font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg hover:border-[#1A2F5F]/20">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#1A2F5F]/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1A2F5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#1A2F5F]">15K+</div>
                <div className="text-gray-600 font-medium">Students Enrolled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse Our Catalog</h2>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select className="bg-white border border-gray-300 rounded-lg text-gray-900 font-medium px-4 py-2.5 focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] shadow-sm">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Filter by category</h3>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-[#4A72D0] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
              <p className="text-gray-600 mt-2">Hand-picked collection of our most popular courses</p>
            </div>
            <button className="hidden md:flex items-center text-[#4A72D0] font-medium hover:text-[#3A5BB0] transition">
              View all courses
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          
          <PopularCourses />
          
          <div className="mt-10 text-center md:hidden">
            <button className="bg-gradient-to-r from-[#4A72D0] to-[#3A5BB0] hover:from-[#3A5BB0] hover:to-[#2A4B8C] text-white font-medium py-3 px-8 rounded-lg transition shadow-md hover:shadow-lg">
              View All Courses
            </button>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">What Our Students Say</h2>
          <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">Join thousands of satisfied learners who have transformed their careers with our courses</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">This course completely transformed my approach to web development. The instructors explain complex concepts in an easy-to-understand way</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">JD</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-500">Software Engineer</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">The hands-on projects were incredibly valuable. I was able to apply what I learned immediately in my job and got promoted within 6 months!</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">AS</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Anna Smith</div>
                  <div className="text-sm text-gray-500">Product Manager</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">The mentorship program was exceptional. Having direct access to industry experts helped me navigate complex topics and build confidence</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">MJ</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Michael Johnson</div>
                  <div className="text-sm text-gray-500">UX Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative bg-gradient-to-br from-[#0F1E45] to-[#1A2F5F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#4A72D0]/10 to-transparent"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#C48CB3]/10"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join over 15,000 students who have accelerated their careers with our industry-relevant courses. 
            Learn from experts, work on real-world projects, and get career support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#1A2F5F] font-semibold py-4 px-8 rounded-xl transition-all hover:bg-gray-100 shadow-lg hover:shadow-xl">
              Explore All Courses
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-xl transition-all hover:bg-white/10 shadow-lg hover:shadow-xl">
              Speak to an Advisor
            </button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-10">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#C48CB3] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>30-day money-back guarantee</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#C48CB3] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Learn at your own pace</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#C48CB3] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Certificate of completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}