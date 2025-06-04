import React, { useState, useEffect, useRef } from 'react';
// WebGLBackground component (simple CSS-based transition)
const WebGLBackground = ({ isDarkMode }) => {
return (
<div className={`absolute inset-0 transition-colors duration-500
${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}
bg-gradient-to-br from-transparent ${isDarkMode ? 'to-blue-900'
: 'to-blue-200'} opacity-30`}>
{/* Subtle overlay for gradient effect */}
</div>
);
};
// CustomCursor component
const CustomCursor = ({ isDarkMode }) => {
const cursorRef = useRef(null);
useEffect(() => {
const onMouseMove = (e) => {
if (cursorRef.current) {
cursorRef.current.style.left = `${e.clientX}px`;
cursorRef.current.style.top = `${e.clientY}px`;
}
};
window.addEventListener('mousemove', onMouseMove);
return () => {
window.removeEventListener('mousemove', onMouseMove);
};
}, []);
return (
<div
ref={cursorRef}
className={`hidden md:block fixed pointer-events-none z-50
rounded-full transition-all duration-100 ease-out
${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} opacity-50`}
style={{ width: '20px', height: '20px', transform:
'translate(-50%, -50%)' }}
></div>
);
};
// AnimatedSection component for scroll-triggered animations
const AnimatedSection = ({ children }) => {
const sectionRef = useRef(null);
const [isVisible, setIsVisible] = useState(false);
useEffect(() => {
const observer = new IntersectionObserver(
([entry]) => {
if (entry.isIntersecting) {
setIsVisible(true);
// Optionally, stop observing once visible if animation
should only play once
// observer.unobserve(entry.target);
} else {
// Optionally, reset visibility if you want animation to
replay on scroll back
// setIsVisible(false);
}
},
{
root: null, // viewport
rootMargin: '0px',
threshold: 0.2, // Trigger when 20% of the section is visible
}
);
if (sectionRef.current) {
observer.observe(sectionRef.current);
}
return () => {
if (sectionRef.current) {
observer.unobserve(sectionRef.current);
}
};
}, []);
return (
<div
ref={sectionRef}
className={`transition-all duration-700 ease-out
${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0
translate-y-10'}`}
>
{children}
</div>
);
};
// Section components (now wrapped by AnimatedSection in App's return)
const AboutSection = ({ isDarkMode }) => {
return (
<section id="about" className="p-8 min-h-screen flex items-center
justify-center">
<div className="w-full max-w-4xl">
<h2 className="text-4xl font-extrabold mb-4 text-center">About
Me</h2>
<div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}
p-6 rounded-lg shadow-lg space-y-4`}>
<h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ?
'text-blue-400' : 'text-blue-700'}`}>Who I Am</h3>
<p className={`text-lg leading-relaxed ${isDarkMode ?
'text-[#E6DCE8]' : 'text-[#4A434F]'}`}>
I'm a self-taught bioinformatics learner passionate about
exploring biological data through code and computation.
I focus on single-cell and multi-omics analysis, combining
programming, statistics, and data mining to extract
meaningful insights from complex datasets. Constantly
exploring new tools and staying up to date with advances
in computational biology, I enjoy building projects that
bridge biology and data science.
</p>
<p className={`text-lg leading-relaxed ${isDarkMode ?
'text-[#E6DCE8]' : 'text-[#4A434F]'}`}>
I've worked with tools like Python, R, Scanpy, and
Linux/Bash scripting, and I'm familiar with analyzing
real-world datasets from single-cell and multi-omics
experiments. My portfolio reflects my learning journey,
with projects that demonstrate both technical skills and
scientific curiosity.
</p>
<h3 className={`text-2xl font-semibold mt-4 mb-2
${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Why I Became
Interested in Bioinformatics</h3>
<p className={`text-lg leading-relaxed ${isDarkMode ?
'text-[#E6DCE8]' : 'text-[#4A434F]'}`}>
With several years of experience in pharmaceuticals, I had
already developed a strong passion for technology and data analysis.
As I explored ways to apply this interest in a meaningful
scientific context, I discovered that bioinformatics offered the
perfect opportunity
to integrate my technical skills with my educational
background in pharmacy. It allowed me to approach health science from
a new, data-driven perspective.
To pursue this path, I began self-learning programming
languages like Python and R, and expanded my knowledge through
advanced courses and hands-on projects.
Working with real datasets and sharing my work has only
deepened my enthusiasm to contribute to innovative research in drug
discovery and computational biology.
</p>
</div>
</div>
</section>
);
};
// Consolidated ExpertiseAndLearningSection
const ExpertiseAndLearningSection = ({ isDarkMode, skills }) => {
const getSkillIcon = (skillName) => {
switch (skillName.toLowerCase()) {
case 'python':
return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0
24 24" fill="currentColor" className="w-5 h-5 mr-2"><path d="M12
2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1
.75-.75ZM7.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H7.5ZM16.5
12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H16.5ZM12 18a.75.75 0 0 1
.75.75v2.25a.75.75 0 0 1-1.5 0V18a.75.75 0 0 1 .75-.75ZM12 7.5a.75.75
0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0V8.25a.75.75 0 0 0-.75-.75ZM12
15a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0
0-.75-.75ZM18.75 9a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5
0V9.75a.75.75 0 0 0-.75-.75ZM5.25 9a.75.75 0 0 0-.75.75v.75a.75.75 0 0
0 1.5 0V9.75a.75.75 0 0 0-.75-.75ZM18.75 15a.75.75 0 0
0-.75.75v.75a.75.75 0 0 0 1.5 0V15.75a.75.75 0 0 0-.75-.75ZM5.25
15a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0V15.75a.75.75 0 0
0-.75-.75ZM12 5.25a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75
0 0 1 .75-.75ZM12 17.25a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5
0v-.75a.75.75 0 0 1 .75-.75ZM18.75 12a.75.75 0 0 0-.75.75v.75a.75.75 0
0 0 1.5 0V12.75a.75.75 0 0 0-.75-.75ZM5.25 12a.75.75 0 0
0-.75.75v.75a.75.75 0 0 0 1.5 0V12.75a.75.75 0 0 0-.75-.75Z"
/></svg>);
case 'linux':
return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0
24 24" fill="currentColor" className="w-5 h-5 mr-2"><path
fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365
9.75 9.75S17.385 21.75 12 21.75 2.25 17.385 2.25
12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0A.75.75 0 0 1 9
9.417v4.036c0 .543.12.89.356 1.15.236.26.583.389 1.126.389h.01c.543 0
.89-.129 1.126-.389.236-.26.356-.607.356-1.15V9.417a.75.75 0 0 1
.22-.534ZM7.25 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0
0-1.5H7.25ZM16.75 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H16.75Z"
clipRule="evenodd" /></svg>);
case 'rstudio':
return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0
24 24" fill="currentColor" className="w-5 h-5 mr-2"><path d="M4.5
4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0
0-3-3h-9Z" /><path fillRule="evenodd" d="M19.5 1.5a.75.75 0 0 0-1.5
0v2.25a.75.75 0 0 0 1.5 0V1.5ZM18 7.5a.75.75 0 0 0 0 1.5h.75a.75.75 0
0 0 0-1.5H18ZM18 16.5a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0
0-1.5H18ZM16.5 21a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM7.5
18a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H7.5ZM3 16.5a.75.75 0 0 0
0 1.5h.75a.75.75 0 0 0 0-1.5H3ZM1.5 7.5a.75.75 0 0 0 0 1.5h.75a.75.75
0 0 0 0-1.5H1.5ZM6 3a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H6ZM16.5
3a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Z" clipRule="evenodd"
/></svg>);
case 'scanpy':
return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0
24 24" fill="currentColor" className="w-5 h-5 mr-2"><path
fillRule="evenodd" d="M11.54 22.351A2.75 2.75 0 0 0 15
21.25V4.723c0-.621.506-1.127 1.127-1.127H19.5a.75.75 0 0 0
0-1.5h-3.373A2.625 2.625 0 0 0 13.5 2.25h-3c-.621 0-1.127.506-1.127
1.127v16.528a2.75 2.75 0 0 0 3.04 2.223ZM2.25 12c0-5.385 4.365-9.75
9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25
12Zm8.74-3.351a.75.75 0 0 0-1.5 0v4.75a.75.75 0 0 0 1.5 0v-4.75ZM15
8.649a.75.75 0 0 0-1.5 0v4.75a.75.75 0 0 0 1.5 0v-4.75Z"
clipRule="evenodd" /></svg>);
case 'jupyter':
return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0
24 24" fill="currentColor" className="w-5 h-5 mr-2"><path
fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365
9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9.75
10.5a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H9.75ZM13.5 10.5a.75.75
0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H13.5ZM12 15a.75.75 0 0
0-.75.75v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0 0-.75-.75Z"
clipRule="evenodd" /></svg>);
case 'scarf':
return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0
24 24" fill="currentColor" className="w-5 h-5 mr-2"><path
fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0
1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84
1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
clipRule="evenodd" /><path fillRule="evenodd" d="M3.087 9L5.25
21.75h13.5L20.913 9H3.087ZM12 9.75a.75.75 0 0 0-1.5 0V12h-2.25a.75.75
0 0 0 0 1.5H10.5v2.25a.75.75 0 0 0 1.5 0V13.5h2.25a.75.75 0 0 0
0-1.5H12V9.75Z" clipRule="evenodd" /></svg>);
default:
return null;
}
};
const skillsToDisplay = Array.isArray(skills) ? skills : [];
return (
<section id="expertise-and-learning" className="p-8 min-h-screen
flex items-center justify-center">
<div className="w-full max-w-6xl">
<h2 className="text-4xl font-extrabold mb-4 text-center">My
Expertise & Learning Journey</h2>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/*
Responsive grid for sub-sections */}
{/* Skills Section */}
<div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}
p-6 rounded-lg shadow-lg`}>
<h3 className={`text-2xl font-semibold mb-4 text-center
${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Bioinformatics
Tools & Skills</h3>
<div className="flex flex-wrap justify-center gap-4">
{skillsToDisplay.map((skill, index) => (
<span key={index} className={`px-5 py-2 rounded-full
text-lg font-medium transition-all duration-300 flex items-center
${isDarkMode ? 'bg-blue-600 hover:bg-blue-500
text-gray-100' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}
shadow-md hover:shadow-lg transform
hover:scale-105`}>
{getSkillIcon(skill)}
{skill}
</span>
))}
</div>
</div>
{/* Education & Courses Sections */}
<div className="flex flex-col gap-8"> {/* Stack education
and courses vertically */}
{/* Education Section */}
<div className={`${isDarkMode ? 'bg-gray-800' :
'bg-white'} p-6 rounded-lg shadow-lg space-y-4`}>
<h3 className={`text-2xl font-semibold mb-4 text-center
${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Education</h3>
<p className="text-lg">
<strong className={`text-xl ${isDarkMode ?
'text-blue-400' : 'text-blue-700'}`}>Bachelor of Science in
Pharmacy</strong><br/>
National Ribat University, Khartoum, Sudan (2010–2015)
</p>
<p className={`text-base ${isDarkMode ? 'text-gray-400'
: 'text-gray-500'}`}>
Modules Studied: Pharmacology, Clinical Pharmacology,
Biochemistry, Pharmaceutics, Microbiology, and more.
</p>
</div>
{/* Courses Section */}
<div className={`${isDarkMode ? 'bg-gray-800' :
'bg-white'} p-6 rounded-lg shadow-lg`}>
<h3 className={`text-2xl font-semibold mb-4 text-center
${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Courses</h3>
<ul className="list-disc list-inside space-y-2 text-lg">
<li className={`${isDarkMode ? 'text-[#E6DCE8]' :
'text-[#4A434F]'}`}>Introduction to Bioinformatics</li>
<li className={`${isDarkMode ? 'text-[#E6DCE8]' :
'text-[#4A434F]'}`}>Basic Pharmaceutical Marketing Skills</li>
<li className={`${isDarkMode ? 'text-[#E6DCE8]' :
'text-[#4A434F]'}`}>Total Quality Management</li>
<li className={`${isDarkMode ? 'text-[#E6DCE8]' :
'text-[#4A434F]'}`}>Drug Information Resources</li>
<li className={`${isDarkMode ? 'text-[#E6DCE8]' :
'text-[#4A434F]'}`}>Kaggle Python Course</li>
<li className={`${isDarkMode ? 'text-[#E6DCE8]' :
'text-[#4A434F]'}`}>Bioinformatics for Biologist: Linux, BASH
Scripting, AND R</li>
</ul>
</div>
</div>
</div>
</div>
</section>
);
};
const ProjectsSection = ({ isDarkMode }) => {
const projects = [
{
title: 'Covid-19-single-cell-analysis-Scanpy',
description: 'Analysis of COVID-19 single-cell data using
Scanpy.',
githubLink:
'https://github.com/mujtababarsi/Covid-19-single-cell-analysis-Scanpy'
,
techStack: ['Python', 'Scanpy', 'Bioinformatics'],
image:
'https://placehold.co/400x250/333333/FFFFFF?text=COVID-19+scRNA-seq',
},
{
title: 'R-and-rstudio-Data-visualisation-with-ggplot2',
description: 'Data visualization projects using R and ggplot2.',
githubLink:
'https://github.com/mujtababarsi/R-and-rstudio-Data-visualisation-with
-ggplot2',
techStack: ['R', 'RStudio', 'ggplot2'],
image:
'https://placehold.co/400x250/333333/FFFFFF?text=R+Data+Viz',
},
{
title: 'spatial-omics',
description: 'Projects related to spatial omics data analysis.',
githubLink: 'https://github.com/mujtababarsi/spatial-omics',
techStack: ['Python', 'R', 'Spatial Omics'],
image:
'https://placehold.co/400x250/333333/FFFFFF?text=Spatial+Omics',
},
{
title: 'Scarf-workflow-PBMC',
description: 'A workflow for PBMC analysis using Scarf.',
githubLink:
'https://github.com/mujtababarsi/Scarf-workflow-PBMC',
techStack: ['Python', 'SCARF', 'PBMC Analysis'],
image:
'https://placehold.co/400x250/333333/FFFFFF?text=SCARF+Workflow',
},
{
title: 'Scanpy-scRNA-seq-Analysis',
description: 'Single-cell RNA sequencing analysis using
Scanpy.',
githubLink:
'https://github.com/mujtababarsi/Scanpy-scRNA-seq-Analysis',
techStack: ['Python', 'Scanpy', 'scRNA-seq'],
image:
'https://placehold.co/400x250/333333/FFFFFF?text=Scanpy+scRNA-seq',
},
{
title: 'iris.datasets-Machine-Learning',
description: 'Machine learning project using the Iris dataset.',
githubLink:
'https://github.com/mujtababarsi/iris.datasets-Machine-Learning',
techStack: ['Python', 'Machine Learning', 'Scikit-learn'],
image:
'https://placehold.co/400x250/333333/FFFFFF?text=Iris+ML',
},
];
return (
<section id="projects" className="p-8 min-h-screen flex
items-center justify-center">
<div className="w-full max-w-6xl">
<h2 className="text-4xl font-extrabold mb-4
text-center">Projects</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
gap-8">
{projects.map((project, index) => (
<div
key={index}
className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}
p-6 rounded-lg shadow-lg transform transition-all duration-300
hover:shadow-xl hover:scale-105 flex flex-col`}
>
<img
src={project.image}
alt={`${project.title} Thumbnail`}
className="w-full h-40 object-cover rounded-md mb-4"
onError={(e) => { e.target.onerror = null;
e.target.src="https://placehold.co/400x250/AAAAAA/000000?text=Image+Er
ror"; }}
/>
<h3 className={`text-2xl font-semibold mb-2 ${isDarkMode
? 'text-blue-400' : 'text-blue-700'}`}>{project.title}</h3>
<p className={`text-base mb-4 flex-grow ${isDarkMode ?
'text-[#E6DCE8]' : 'text-[#4A434F]'}`}>{project.description}</p>
<div className="flex flex-wrap gap-2 mb-4">
{project.techStack.map((tech, techIndex) => (
<span key={techIndex} className={`${isDarkMode ?
'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} text-xs
px-3 py-1 rounded-full`}>
{tech}
</span>
))}
</div>
<div className="flex justify-between items-center
mt-auto">
<a
href={project.githubLink}
target="_blank"
rel="noopener noreferrer"
className={`${isDarkMode ? 'bg-blue-600
hover:bg-blue-500' : 'bg-blue-700 hover:bg-blue-600'} text-white
font-bold py-2 px-4 rounded-full transition-colors duration-300
text-sm`}
>
View Code
</a>
<a
href="#" // Placeholder for live demo link
target="_blank"
rel="noopener noreferrer"
className={`${isDarkMode ? 'bg-gray-700
hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} text-white
font-bold py-2 px-4 rounded-full transition-colors duration-300
text-sm`}
>
Live Demo
</a>
</div>
</div>
))}
</div>
</div>
</section>
);
};
export default function App() {
const [isDarkMode, setIsDarkMode] = useState(false); // Default to
light mode to match CV
return (
<div className={`relative min-h-screen ${isDarkMode ? 'bg-gray-950
text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
<CustomCursor isDarkMode={isDarkMode} />
{/* Toggle Light/Dark Mode button - Re-added for testing theme
*/}
<button
onClick={() => setIsDarkMode(!isDarkMode)}
className="fixed top-4 right-4 z-50 px-4 py-2 rounded
bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all
duration-300"
>
Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
</button>
{/* Hero Section - Always visible, no specific animation logic
*/}
<section id="hero" className="h-screen relative overflow-hidden
flex items-center justify-center">
<WebGLBackground isDarkMode={isDarkMode} />
<div className="absolute inset-0 z-10 flex flex-col
items-center justify-center text-center p-4">
<h1 className={`text-6xl md:text-7xl lg:text-8xl
font-extrabold tracking-tight mb-2 ${isDarkMode ? 'text-gray-50' :
'text-gray-900'}`}>Mohamed Elmugtaba</h1>
<p className={`text-2xl md:text-3xl font-medium ${isDarkMode
? 'text-gray-400' : 'text-gray-500'}`}>Bioinformatician</p>
<p className={`text-xl md:text-2xl mt-1 ${isDarkMode ?
'text-gray-400' : 'text-gray-500'}`}>Mainly focus in single cell
analysis and spatial Transcriptomic</p>
{/* Email and GitHub Icons */}
<div className="flex space-x-6 mt-8">
{/* Email Icon */}
<a href="mailto:mujtababarci@gmail.com"
className={`${isDarkMode ? 'text-gray-100 hover:text-blue-400' :
'text-gray-800 hover:text-blue-700'} transition-colors duration-300`}
aria-label="Email">
<svg xmlns="http://www.w3.org/2000/svg" fill="none"
viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
className="w-10 h-10">
<path strokeLinecap="round" strokeLinejoin="round"
d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0
1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0
0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25
2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
</a>
{/* GitHub Icon */}
<a href="https://github.com/mujtababarsi" target="_blank"
rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-100
hover:text-blue-400' : 'text-gray-800 hover:text-blue-700'}
transition-colors duration-300`} aria-label="GitHub Profile">
<svg xmlns="http://www.w3.org/2000/svg" width="40"
height="40" fill="currentColor" viewBox="0 0 16 16">
<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47
7.59.4.07.55-.17.55-.38
0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1
.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82
2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87
3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
.21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
</svg>
</a>
</div>
</div>
</section>
{/* Render all sections wrapped in AnimatedSection for
scroll-triggered animation */}
<AnimatedSection>
<AboutSection isDarkMode={isDarkMode} />
</AnimatedSection>
<AnimatedSection>
<ExpertiseAndLearningSection
isDarkMode={isDarkMode}
skills={[
'Python', 'Linux', 'SCARF',
'RStudio', 'Scanpy', 'Jupyter'
]}
/>
</AnimatedSection>
<AnimatedSection>
<ProjectsSection isDarkMode={isDarkMode} />
</AnimatedSection>
</div>
);
}
