"""Flask app for Cupcakes"""
import os

from flask import Flask, request, jsonify, url_for, render_template

from models import db, dbx, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", "postgresql:///cupcakes")

app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_RECORD_QUERIES'] = True
app.config['SECRET_KEY'] = "secret"
db.init_app(app)


@app.get("/")
def show_homepage():
    """Display homepage."""

    return render_template("index.jinja")


@app.get("/api/cupcakes")
def get_cupcakes_data():
    """Get data on all cupcakes. Return JSON for all instances.
    {'cupcakes': [{id, flavor, rating, size, image_url}, ...]}
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


@app.patch("/api/cupcakes/<int:cupcake_id>")
def update_cupcake(cupcake_id):
    """Update date about a cupcake.
    Respond with JSON of the newly-updated cupcake, TODO: put in what it takes in as well
    {cupcake: {id, flavor, size, rating, image_url}}
    """

    cupcake = db.get_or_404(Cupcake, cupcake_id)

    # get raw data from the request
    cupcake_updates = request.get_json()  # .json -> same thing

    # update by looping through cupcake instance and replacing any data with
    # what comes through in request

    cupcake.flavor = cupcake_updates.get("flavor", cupcake.flavor)
    cupcake.size = cupcake_updates.get("size", cupcake.size)
    cupcake.rating = cupcake_updates.get("rating", cupcake.rating)
    cupcake.image_url = cupcake_updates.get("image_url", cupcake.image_url)

    # update resource in db with a commit

    db.session.commit()

    # return json
    return jsonify(cupcake=cupcake.serialize())


@app.delete("/api/cupcakes/<int:cupcake_id>")
def delete_cupcake(cupcake_id):
    """Delete cupcake with the id passed in the URL.
    Respond with JSON similar to {deleted: [cupcake-id]}
    """
    cupcake = db.get_or_404(Cupcake, cupcake_id)

    # update resource in db with a commit
    db.session.delete(cupcake)
    db.session.commit()

    # return json
    return jsonify(deleted=cupcake_id)
