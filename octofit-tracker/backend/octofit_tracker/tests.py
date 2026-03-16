from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name="Marvel", description="Marvel superheroes")
        self.assertEqual(team.name, "Marvel")

    def test_user_creation(self):
        team = Team.objects.create(name="DC", description="DC superheroes")
        user = User.objects.create(name="Superman", email="superman@dc.com", team=team)
        self.assertEqual(user.team.name, "DC")

    def test_activity_creation(self):
        team = Team.objects.create(name="Marvel")
        user = User.objects.create(name="Iron Man", email="ironman@marvel.com", team=team)
        activity = Activity.objects.create(user=user, type="Running", duration=30, date="2023-01-01")
        self.assertEqual(activity.user.name, "Iron Man")

    def test_workout_creation(self):
        workout = Workout.objects.create(name="Pushups", description="Upper body workout")
        self.assertEqual(workout.name, "Pushups")

    def test_leaderboard_creation(self):
        team = Team.objects.create(name="Marvel")
        leaderboard = Leaderboard.objects.create(team=team, score=100)
        self.assertEqual(leaderboard.score, 100)
