# Generated by Django 5.0.2 on 2024-12-07 21:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lesson', '0002_alter_lesson_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lessonmaterial',
            name='lesson',
        ),
        migrations.RemoveField(
            model_name='lessonmaterial',
            name='section',
        ),
        migrations.RemoveField(
            model_name='lessonquiz',
            name='lesson',
        ),
        migrations.RemoveField(
            model_name='lessonquizquestion',
            name='quiz',
        ),
        migrations.AlterModelOptions(
            name='lessonsection',
            options={'ordering': ['order']},
        ),
        migrations.AddField(
            model_name='lesson',
            name='avatar_face_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='lessonsection',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='lessonsection',
            name='order',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='lessonsection',
            name='lesson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='lesson.lesson'),
        ),
        migrations.AlterField(
            model_name='lessonsection',
            name='title',
            field=models.CharField(default='Untitled', max_length=200),
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('order', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='lesson.lesson')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('order', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='lesson.quiz')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='QuizQuestionOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('is_correct', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='lesson.quizquestion')),
            ],
        ),
        migrations.DeleteModel(
            name='LessonLecture',
        ),
        migrations.DeleteModel(
            name='LessonMaterial',
        ),
        migrations.DeleteModel(
            name='LessonQuiz',
        ),
        migrations.DeleteModel(
            name='LessonQuizQuestion',
        ),
    ]