import {FaGift} from "react-icons/fa";
import {useState} from "react";

export default function GiftIdeaPage() {
    const [loading, setLoading] = useState(false);
    const [giftIdeas, setGiftIdeas] = useState([]);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        budget: "",
        interests: "",
        relationship: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setGiftIdeas([]);

        try {
            const response = await fetch(
                "https://gift-idea-generator-tikz.onrender.com/generate/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setGiftIdeas(data['gift_ideas'] || []);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>
                    <FaGift style={styles.icon}/>
                    Gift Idea Generator
                </h1>
            </header>

            <main style={styles.main}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.formTitle}>Enter Gift Criteria</h2>

                    <div style={styles.formGroup}>
                        <label htmlFor="age" style={styles.label}>
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., 25"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="gender" style={styles.label}>
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={styles.select}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="budget" style={styles.label}>
                            Budget
                        </label>
                        <input
                            type="text"
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., $50-$100"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="interests" style={styles.label}>
                            Interests
                        </label>
                        <input
                            type="text"
                            id="interests"
                            name="interests"
                            value={formData.interests}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., Sports, Music"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="relationship" style={styles.label}>
                            Relationship
                        </label>
                        <input
                            type="text"
                            id="relationship"
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., Friend, Parent"
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Generate Ideas
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                {giftIdeas.length > 0 && (
                    <div style={styles.results}>
                        <h3 style={styles.resultsTitle}>Gift Ideas</h3>
                        <ul style={styles.resultsList}>
                            {giftIdeas.map((idea, index) => (
                                <li key={index} style={styles.resultItem}>
                                    {idea['name']}
                                    <p>{idea['description']}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; 2025 Gift Idea Generator</p>
            </footer>
        </div>
    );
}

GiftIdeaPage.getLayout = function getLayout(page) {
    return <>{page}</>;
};

const styles = {
    page: {
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        backgroundColor: "#007BFF",
        color: "white",
        padding: "20px",
        textAlign: "center",
    },
    headerTitle: {
        fontSize: "24px",
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginRight: "10px",
    },
    main: {
        flexGrow: 1,
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "100%",
    },
    formTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    formGroup: {
        marginBottom: "15px",
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
    },
    select: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
    footer: {
        backgroundColor: "#007BFF",
        color: "white",
        textAlign: "center",
        padding: "10px",
    },
};
