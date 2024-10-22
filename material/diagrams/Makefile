setup: 
	brew install plantuml

plantuml: 
	plantuml -v *.plantuml

plantuml-watch: 
	ls *.plantuml | entr -c plantuml -v *.plantuml
