// src/pages/Online/InfoPage.jsx
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import Footer from "../../components/Footer";
import "../../styles/infoPage.css";

export default function InfoPage() {
  const { id, sectionSlug, topicSlug } = useParams();
  const navigate = useNavigate();

  const formattedTitle = topicSlug.replace(/-/g, " ");

  // Save viewed progress in localStorage
  useEffect(() => {
    const key = `completed_${id}`;
    const viewed = JSON.parse(localStorage.getItem(key)) || [];
    if (!viewed.includes(topicSlug)) {
      viewed.push(topicSlug);
      localStorage.setItem(key, JSON.stringify(viewed));
    }
  }, [id, topicSlug]);

  const handleBack = () => navigate(-1);

  return (
    <Layout>
      <div className="info-page">
        <div className="breadcrumbs">
          <Link to="/modules">Home</Link> /{" "}
          <Link to={`/modules/${id}`}>Module</Link> /{" "}
          <span>{formattedTitle}</span>
        </div>

        <h1 className="info-title">{formattedTitle}</h1>

        <div className="info-content">
          <p>
            This is placeholder content for <strong>{formattedTitle}</strong>. You can replace this
            with your actual reading material, text, or embedded content.
          </p>
          <p>
            Once the user visits this page, it automatically counts as "read" and unlocks the next
            section after completing all topics in the current section.
          </p>
        </div>

        <button onClick={handleBack} className="btn btn-outline mt-4">
          Back to Course
        </button>
      </div>
      <Footer />
    </Layout>
  );
}
