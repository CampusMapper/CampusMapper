LATEX=pdflatex
SOURCE=milestone1.tex
AUX=$(SOURCE:.tex=.aux)
LOG=$(SOURCE:.tex=.log)
TARGETS=$(SOURCE:.tex=.pdf)

all: $(TARGETS)

$(TARGETS): %.pdf: %.tex
	$(LATEX) $<

clean:
	rm $(AUX) $(LOG)

distclean:
	rm $(TARGETS)
	rm $(AUX) $(LOG)
