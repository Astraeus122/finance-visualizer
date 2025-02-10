import pandas as pd
from flask import Blueprint, request, jsonify

upload_bp = Blueprint("upload", __name__)

@upload_bp.route("/", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    try:
        # Determine file type and read accordingly
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file)
        else:
            return jsonify({"error": "Unsupported file format. Please upload a CSV or Excel file."}), 400

        df.fillna(0, inplace=True)

        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
        df["Date"] = df["Date"].dt.strftime("%Y-%m-%d")

        daily_spending = df.groupby("Date")["Amount"].sum().reset_index()

        summary = {
            "total_transactions": len(df),
            "total_spent": float(df["Amount"].sum()),
            "categories": df["Category"].unique().tolist(),
            "dates": daily_spending["Date"].tolist(),
            "amounts": daily_spending["Amount"].tolist(),
        }

        return jsonify(summary), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
