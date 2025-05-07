import { useState } from "react";
import { FaGift, FaSpinner } from "react-icons/fa";
import {
  ageOptions,
  genderOptions,
  budgetOptions,
  relationshipOptions,
  interestOptions,
} from "../helpers/gift-form-visual-options";

// Simple utility for animated selection
function OptionSelector({ options, selected, onSelect, multi = false }) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
      {options.map((opt) => {
        const isSelected = multi ? selected.includes(opt.value) : selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() =>
              multi
                ? onSelect(
                    isSelected
                      ? selected.filter((v) => v !== opt.value)
                      : [...selected, opt.value]
                  )
                : onSelect(opt.value)
            }
            style={{
              border: isSelected ? "2px solid #9b5de5" : "2px solid #eee",
              background: isSelected ? "#f1cfff" : "#fff",
              borderRadius: 16,
              padding: 12,
              fontSize: 22,
              minWidth: 54,
              minHeight: 54,
              boxShadow: isSelected ? "0 2px 12px #c77dff44" : "none",
              transition: "all 0.2s",
              cursor: "pointer",
              outline: isSelected ? "2px solid #f15bb5" : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-pressed={isSelected}
            aria-label={opt.label}
          >
            <span style={{ fontSize: 28, marginBottom: 2 }}>{opt.icon}</span>
            <span style={{ fontSize: 12, color: isSelected ? "#9b5de5" : "#444" }}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function GiftIdeaPage() {
    const [loading, setLoading] = useState(false);
    const [giftIdeas, setGiftIdeas] = useState([]);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
  age: "",
  gender: "",
  budget: "",
  interests: [],
  relationship: "",
});

// For visual selection
const setField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

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
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.message || `Error: ${response.statusText}`);
            }

            const data = await response.json();
            setGiftIdeas(data?.gift_ideas || []);
            if (!data?.gift_ideas || data.gift_ideas.length === 0) {
                setError("No gift ideas found for the given criteria. Try being more general!");
            }
        } catch (err) {
            setError(err.message || "Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logoContainer}>
                    <FaGift style={styles.logoIcon} />
                    <h1 style={styles.headerTitle}>GiftGenius</h1>
                </div>
                <p style={styles.headerSubtitle}>Find the perfect gift, effortlessly.</p>
            </header>

            <main style={styles.main}>
                <div style={styles.formCard}>
                    <h2 style={styles.formTitle}>Describe Who You're Shopping For</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
  <div style={styles.formRow}>
    <div style={styles.formGroup}>
      <label style={styles.label}>Age Group</label>
      <OptionSelector
        options={ageOptions}
        selected={formData.age}
        onSelect={(v) => setField("age", v)}
      />
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label}>Gender</label>
      <OptionSelector
        options={genderOptions}
        selected={formData.gender}
        onSelect={(v) => setField("gender", v)}
      />
    </div>
  </div>
  <div style={styles.formRow}>
    <div style={styles.formGroup}>
      <label style={styles.label}>Budget</label>
      <OptionSelector
        options={budgetOptions}
        selected={formData.budget}
        onSelect={(v) => setField("budget", v)}
      />
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label}>Relationship</label>
      <OptionSelector
        options={relationshipOptions}
        selected={formData.relationship}
        onSelect={(v) => setField("relationship", v)}
      />
    </div>
  </div>
  <div style={styles.formGroupFull}>
    <label style={styles.label}>Interests & Hobbies</label>
    <OptionSelector
      options={interestOptions}
      selected={formData.interests}
      onSelect={(v) => setField("interests", v)}
      multi={true}
    />
    <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
      (Pick as many as you like!)
    </div>
  </div>
  <button
    type="submit"
    style={{ ...styles.button, fontSize: 20, marginTop: 16, position: "relative", overflow: "hidden" }}
    disabled={loading}
  >
    {loading ? <FaSpinner style={styles.spinnerIcon} /> : <span role="img" aria-label="sparkle">✨</span>}
    {loading ? " Finding..." : " Find Gift Ideas"}
  </button>
</form>
                </div>

                {error && (
                    <div style={styles.errorContainer}>
                        <p style={styles.errorText}>{error}</p>
                    </div>
                )}

                {!loading && giftIdeas.length > 0 && (
                    <div style={styles.resultsCard}>
                        <h3 style={styles.resultsTitle}>Here are some ideas!</h3>
                        <div style={styles.resultsGrid}>
                            {giftIdeas.map((idea, index) => (
                                <div key={index} style={styles.resultItem}>
                                    <h4 style={styles.ideaName}>{idea.name}</h4>
                                    <p style={styles.ideaDescription}>{idea.description}</p>
                                    {idea.estimated_price && <p style={styles.ideaPrice}>Est. Price: ${idea.estimated_price}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {!loading && giftIdeas.length === 0 && !error && formData.age !== "" && ( // Show if submitted but no results
                    <div style={styles.noResultsCard}>
                        <p style={styles.noResultsText}>
                            Fill out the form above to discover amazing gift ideas!
                        </p>
                    </div>
                )}
            </main>

            <footer style={styles.footer}>
                <p>&copy; {new Date().getFullYear()} GiftGenius. All rights reserved.</p>
            </footer>
        </div>
    );
}

GiftIdeaPage.getLayout = function getLayout(page) {
    return <>{page}</>;
};

const styles = {
    page: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#333",
    },
    header: {
        backgroundColor: "#ffffff",
        color: "#2c3e50",
        padding: "30px 20px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderBottom: "3px solid #5D3FD3", // Accent color
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
    },
    logoIcon: {
        fontSize: "3rem",
        color: "#5D3FD3", // Accent color
        marginRight: "15px",
    },
    headerTitle: {
        fontSize: "2.8rem",
        fontWeight: "700",
        margin: 0,
        color: "#5D3FD3",
    },
    headerSubtitle: {
        fontSize: "1.1rem",
        color: "#555",
        margin: 0,
    },
    main: {
        flex: 1,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
    },
    formCard: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "700px",
    },
    formTitle: {
        fontSize: "1.8rem",
        color: "#333",
        marginBottom: "25px",
        textAlign: "center",
        fontWeight: "600",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    formRow: {
        display: "flex",
        gap: "20px",
    },
    formGroup: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    formGroupFull: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "0.95rem",
        color: "#444",
        marginBottom: "8px",
        fontWeight: "500",
    },
    input: {
        padding: "12px 15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "1rem",
        transition: "border-color 0.3s, box-shadow 0.3s",
        outline: "none",
    },
    select: {
        padding: "12px 15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "1rem",
        backgroundColor: "#fff",
        transition: "border-color 0.3s, box-shadow 0.3s",
        outline: "none",
    },
    button: {
        backgroundColor: "#5D3FD3", // Accent color
        color: "white",
        padding: "14px 20px",
        border: "none",
        borderRadius: "8px",
        fontSize: "1.1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.3s, transform 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginTop: "10px",
    },
    spinnerIcon: {
        animation: "spin 1s linear infinite",
    },
    errorContainer: {
        backgroundColor: "#ffebee",
        color: "#c62828",
        padding: "15px 20px",
        borderRadius: "8px",
        border: "1px solid #ef9a9a",
        width: "100%",
        maxWidth: "700px",
        textAlign: "center",
    },
    errorText: {
        margin: 0,
        fontSize: "1rem",
    },
    resultsCard: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "900px", // Wider for results
    },
    resultsTitle: {
        fontSize: "1.8rem",
        color: "#333",
        marginBottom: "25px",
        textAlign: "center",
        fontWeight: "600",
    },
    resultsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },
    resultItem: {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #eee",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    },
    ideaName: {
        fontSize: "1.3rem",
        color: "#5D3FD3", // Accent color
        margin: "0 0 10px 0",
        fontWeight: "600",
    },
    ideaDescription: {
        fontSize: "0.95rem",
        color: "#555",
        margin: "0 0 10px 0",
        lineHeight: "1.5",
    },
    ideaPrice: {
        fontSize: "0.9rem",
        color: "#777",
        margin: "0",
        fontStyle: "italic",
    },
    noResultsCard: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
        width: "100%",
        maxWidth: "700px",
        textAlign: "center",
        marginTop: "20px",
    },
    noResultsText: {
        fontSize: "1.1rem",
        color: "#555",
        margin: 0,
    },
    footer: {
        backgroundColor: "#343a40",
        color: "#f8f9fa",
        padding: "25px 20px",
        textAlign: "center",
        fontSize: "0.9rem",
        marginTop: "auto", // Pushes footer to the bottom
    },
};

if (typeof window !== 'undefined') { // Ensure this runs only in the browser
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
  document.head.appendChild(styleSheet);
}
