"use client";
import Link from "next/link";

const TrendingJobs = () => {
  const jobCategories = [
    // First row
    [
      { name: "Work from home jobs", href: "/jobs/work-from-home" },
      { name: "Immediate start jobs", href: "/jobs/immediate-start" },
      { name: "Manager jobs", href: "/jobs/manager" },
      { name: "Finance jobs", href: "/jobs/finance" },
      { name: "Accountant jobs", href: "/jobs/accountant" }
    ],
    // Second row
    [
      { name: "Administrator jobs", href: "/jobs/administrator" },
      { name: "Part time jobs", href: "/jobs/part-time" },
      { name: "Customer service jobs", href: "/jobs/customer-service" },
      { name: "Data entry jobs", href: "/jobs/data-entry" },
      { name: "Graduate jobs", href: "/jobs/graduate" }
    ]
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trending jobs
          </h2>
        </div>

        {/* Job Categories Grid */}
        <div className="space-y-6">
          {jobCategories.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
              {row.map((job, jobIndex) => (
                <Link
                  key={jobIndex}
                  href={job.href}
                  className="px-6 py-3 border-2 border-gray-800 text-gray-800 font-medium text-sm hover:bg-gray-800 hover:text-white transition-all duration-300 rounded-none bg-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {job.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingJobs;