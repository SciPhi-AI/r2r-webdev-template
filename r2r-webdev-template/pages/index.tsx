import React, { useState } from "react";
import styles from "@/styles/R2RWebDevTemplate.module.css";

const R2RQueryApp: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const performQuery = async () => {
    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/r2r-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.appWrapper}>
      <div className={styles.logoContainer}>
        <img
          src="/SciPhi-AI Logo.png"
          alt="SciPhi-AI Logo"
          className={styles.logo}
        />
        <img src="/R2RIcon.png" alt="R2R Icon" className={styles.logo} />
      </div>

      <h1 className={styles.title}>
        Welcome to the R2R Web Development Template!
      </h1>
      <p> This is a simple template to make RAG queries with R2R.</p>
      <p>
        {" "}
        Make sure that your R2R server is up and running, and that you&apos;ve
        uploaded files!
      </p>
      <p>
        For more information:{" "}
        <a
          href="https://r2r-docs.sciphi.ai/documentation/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          R2R Documentation
        </a>
      </p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query here"
        className={styles.queryInput}
      />
      <button
        onClick={performQuery}
        disabled={isLoading}
        className={styles.submitButton}
      >
        Submit Query
      </button>
      {isLoading ? (
        <div className={styles.spinner} />
      ) : (
        <div className={styles.resultDisplay}>
          {result ? (
            result
          ) : (
            <span className={styles.placeholderText}>
              Your generated answer will appear here
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default R2RQueryApp;
