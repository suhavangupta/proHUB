# MiniProject - TE
An online project expo, version control and management platform developed as the mini project of our TE.

The Project is in Python 2.7. Make sure you are working with python 2.7 only and create your virtualenv in Python 2.7 only.

Steps to setup the project to start development

1. Clone or fetch the repo (the project).
2. Create a new virtualenv for the project, and setup the project in that environment by copying the repo inside the virtualenv. 
   (Optional step, but recommended).

3. Activate the virtualenv (if using one).
4. Run pip install -r requirements.txt. 

Steps to take before working with a fetched repo

1. First make sure to fulfil all package dependencies listed in requirements.txt by running pip install -r requirements.txt.

Steps to take before pushing to the repo

1. Before doing the final commit for pushing, make sure to add all the package dependencies you have added into the requirements.txt file by using the commmand                   pip freeze > requirements.txt 
2. First fetch the branch you are working on from repo to get updated branch. (git fetch)
3. Merge you branch with that updated branch (git merge origin/<branch_name (master for main branch)>).
4. Fix any conflicts.
5. Push into your branch (git push -u origin <branch_name>)

