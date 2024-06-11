from setuptools import setup, find_packages

setup(
    name='electricity_cost_calculator',
    version='0.1.0',  # Project version
    author='Ana Santasheva', 
    author_email='', 
    description='Tool for calculating electricity costs considering various factors.',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    url='https://github.com/yourusername/electricity_cost_calculator',
    packages=find_packages(),  # Automatically find and include all packages
    install_requires=[
        # Project's dependencie
        'pytest',
        'pytest-mock',
    ],
    classifiers=[
        'Programming Language :: Python :: 3',
        'Operating System :: OS Independent',
    ],
    python_requires='>=3.6',  # Min version requirement of Python
)
