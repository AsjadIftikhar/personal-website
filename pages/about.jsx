const AboutPage = () => {
    return (
        <>
            <h3 style={{marginBottom: 4}}>A Little Bit About Me</h3>
            <p>Full Stack Developer with almost half a decade of experience in Python and Django, building
                high-performance applications for startups and large enterprises across various sectors, including
                healthcare, marketing and e-commerce. Proficient in the complete software development lifecycle
                (SDLC)
                and Agile methodologies, with a strong focus on RESTful API design, object-oriented programming
                (OOP),
                and relational databases like PostgreSQL and MySQL. Experienced in leading end-to-end projects and
                collaborating with cross-functional teams to deliver scalable, maintainable solutions. Skilled in
                applying SOLID principles and test-driven development (TDD) to produce clean, efficient code, and
                known
                for quickly adapting to new tools and evolving requirements</p>

        </>
    );
};

export async function getStaticProps() {
    return {
        props: {title: 'About'},
    };
}

export default AboutPage;
