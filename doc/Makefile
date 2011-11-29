LATEX=pdflatex
SOURCE=log8.tex
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
