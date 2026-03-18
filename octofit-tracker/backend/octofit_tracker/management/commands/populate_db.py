from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name="Marvel", description="Marvel superheroes")
        dc = Team.objects.create(name="DC", description="DC superheroes")

        # Create users
        ironman = User.objects.create(name="Iron Man", email="ironman@marvel.com", team=marvel)
        captain = User.objects.create(name="Captain America", email="captain@marvel.com", team=marvel)
        superman = User.objects.create(name="Superman", email="superman@dc.com", team=dc)
        batman = User.objects.create(name="Batman", email="batman@dc.com", team=dc)

        # Create activities
        Activity.objects.create(user=ironman, type="Running", duration=30, date="2023-01-01")
        Activity.objects.create(user=captain, type="Cycling", duration=45, date="2023-01-02")
        Activity.objects.create(user=superman, type="Swimming", duration=60, date="2023-01-03")
        Activity.objects.create(user=batman, type="Walking", duration=20, date="2023-01-04")

        # Create workouts
        pushups = Workout.objects.create(name="Pushups", description="Upper body workout")
        squats = Workout.objects.create(name="Squats", description="Lower body workout")
        pushups.suggested_for.add(ironman, captain)
        squats.suggested_for.add(superman, batman)

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, score=150)
        Leaderboard.objects.create(team=dc, score=120)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
