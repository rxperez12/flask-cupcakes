"""Flask app for Cupcakes"""
import os

from flask import Flask, request, redirect, render_template, flash, jsonify, url_for

from models import db, dbx, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", "postgresql:///cupcakes")

app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_RECORD_QUERIES'] = True
app.config['SECRET_KEY'] = "secret"
db.init_app(app)


@app.get("/api/cupcakes")
def get_cupcakes_data():
    """Get data on all cupcakes. Return JSON for all instances.
    {'cupcake': [{id, flavor, rating, size, image_url}, ...]}
    """

    q = db.select(Cupcake).order_by(Cupcake.id)
    cupcakes = dbx(q).scalars().all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)


@app.get("/api/cupcakes/<int:cupcake_id>")
def get_cupcake_data(cupcake_id):
    """Get data on a single cupcake. Return JSON.
    {
        "cupcake": {
                "id": int,
                "flavor": str,
                "size": str
                "rating": int
                "image_url": str
        }
    }
    """

    cupcake = db.get_or_404(Cupcake, cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)


@app.post("/api/cupcakes")
def create_cupcake():
    """Create a cupcake with data from body of request. Respond with JSON.
    {
        "cupcake": {
                "flavor": str,
                "id": int,
                "image_url": str
                "rating": int
                "size": str
        }
    }
    """

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image_url = request.json["image_url"] or None

    new_cupcake = Cupcake(
        flavor=flavor,
        size=size,
        rating=rating,
        image_url=image_url
    )

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    # return tuple of (json, status)
    return (jsonify(cupcake=serialized), 201)
