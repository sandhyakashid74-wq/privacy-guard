function analyzeTerms() {
    const terms = document.getElementById("terms").value.toLowerCase();
    const result = document.getElementById("result");

    if (terms.trim() === "") {
        result.innerHTML = "Please paste Terms & Conditions first.";
        return;
    }

    let score = 0;
    let warnings = [];

    // Personal Data
    if (terms.includes("personal data") || terms.includes("personal information")) {
        score += 30;
        warnings.push(`
            <div class="risk high">
                🔴 <b>HIGH RISK: Personal information may be collected.</b>
                <p>Why risky? Your personal information may be stored or processed by the service.</p>
            </div>
        `);
    }

    // Third Party
    if (terms.includes("third party") || terms.includes("third parties")) {
        score += 30;
        warnings.push(`
            <div class="risk high">
                🔴 <b>HIGH RISK: Data may be shared with third parties.</b>
                <p>Why risky? Other companies may receive or process your information.</p>
            </div>
        `);
    }

    // Location
    if (terms.includes("location")) {
        score += 15;
        warnings.push(`
            <div class="risk medium">
                🟠 <b>MEDIUM RISK: Location data may be collected.</b>
                <p>Why risky? Your location information may reveal where you are or where you go.</p>
            </div>
        `);
    }

    // Advertising
    if (terms.includes("advertising")) {
        score += 10;
        warnings.push(`
            <div class="risk medium">
                🟠 <b>MEDIUM RISK: Your data may be used for advertising.</b>
                <p>Why risky? Your information may be used to personalize advertisements.</p>
            </div>
        `);
    }

    // Tracking
    if (terms.includes("track") || terms.includes("tracking")) {
        score += 15;
        warnings.push(`
            <div class="risk medium">
                🟠 <b>MEDIUM RISK: Your online activity may be tracked.</b>
                <p>Why risky? Your online behavior may be monitored to understand your activities.</p>
            </div>
        `);
    }

    if (score > 100) {
        score = 100;
    }

    let level = "";

    if (score >= 70) {
        level = "🔴 HIGH PRIVACY RISK";
    } else if (score >= 40) {
        level = "🟠 MEDIUM PRIVACY RISK";
    } else if (score > 0) {
        level = "🟡 LOW PRIVACY RISK";
    } else {
        level = "🟢 NO COMMON RISKS DETECTED";
    }

     let recommendation = "";

    if (score >= 70) {
        recommendation = "⚠️ Review these Terms carefully before accepting.";
    } else if (score >= 40) {
        recommendation = "⚠️ Check the Privacy Policy and app permissions.";
    } else if (score > 0) {
        recommendation = "ℹ️ Read the highlighted terms before accepting.";
    } else {
        recommendation = "✅ No common privacy risks were detected.";
    }

    if (warnings.length === 0) {
        result.innerHTML = `
            <h3>Privacy Guard Analysis</h3>
            <h2>Privacy Risk Score: ${score}/100</h2>
            <h3>${level}</h3>
            <p>✅ No common risky terms detected.</p>
            <h3>What should you do?</h3>
            <p>${recommendation}</p>
        `;
    } else {
        result.innerHTML = `
            <h3>Privacy Guard Analysis</h3>
            <h2>Privacy Risk Score: ${score}/100</h2>
            <h3>${level}</h3>

            <h3>🚨 Trap Finder</h3>
            ${warnings.join("")}

            <h3>💡 What should you do?</h3>
            <p>${recommendation}</p>
        `;
    }
}

function clearResult() {
    document.getElementById("terms").value = "";
    document.getElementById("result").innerHTML = "";
}