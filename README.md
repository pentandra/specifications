# Specifications

The specifications, vocabularies, ontologies, and examples in this repository
are designed to enrich our abilities to share knowledge, opinion, and
experience in our collective quest for greater light and understanding.

These specifications are not only theoretical in nature, but are designed for
specific situations and interactions in web applications and open research
systems and platforms. We use and refine them in the software we are creating,
and we hope they will prove useful to others as well.

## Vocabularies & Goals

### Knowledge Design

> — Everything written symbols can say has already passed by. They are like
> tracks left by animals. That is why the masters of meditation refuse to
> accept that writings are final. The aim is to reach true being by means of
> those tracks, those letters, those signs—but reality itself is not a sign,
> and it leaves no tracks. It doesn’t come to us by way of letters or words. We
> can go toward it, by following those words and letters back to what they came
> from. But so long as we are preoccupied with symbols, theories and opinions,
> we will fail to reach the principle.
>
> — But when we give up symbols and opinions, aren’t we left in the utter
> nothingness of being?
>
> — Yes.
>
> Kimura Kyūho, _Kenjutsu Fushigi Hen_, 1768

* Research Intent Ontology ([W3C Unofficial Draft](research-intent-ontology/index.html), [Turtle](research-intent-ontology/rio.ttl))

  The Research Intent Ontology is designed to encourage open collaboration and
  structured discourse throughout the research process. It serves as the
  foundational ontology for describing the context of research across many
  methodological approaches.

  We’re at the early stages of creating this ontology. Expect frequent
  incompatible changes.

### Scholarly Commons

The Scholarly Commons is not a website, nor a platform or organization, but the
convergence around a set of principles, standards, and best practices that
govern how research artifacts (narrative, code, data, workflows, etc.) should
be handled for maximum human and machine-based access. The Scholarly Commons is
not an incremental improvement of the current system of scholarship and
science, but a ground-up redesign of the entire system, from every perspective.

* [FORCE11 Scholarly Commons Working Group](https://www.force11.org/group/scholarly-commons-working-group)

## Contributing

This repository uses the lightweight [GitHub Flow] to manage development and
release activity. All submissions _must_ be on a feature branch based on the
_master_ branch to ease review and integration.

* Do your best to adhere to the existing coding conventions and idioms.
* Don’t use hard tabs, and don’t leave trailing whitespace on any line. Before committing, run `git diff --check` to make sure of this.

## License

All specifications, vocabularies, ontologies, examples within this repository
are licensed under a [CC0 license], unless specified otherwise. Feel free to
use any way you like.

## Pipeline

These specifications are pulled into the publication pipeline for the
[LifePreserver project][lifepreserver] as a git submodule. If you are only
contributing to the specifications herein, you should only need to fork and
contribute to [this repository] to collaborate (this was the primary motivation
behind separating these specifications from the main project this way).

[lifepreserver]: https://github.com/pentandra/lifepreserver
[this repository]: https://github.com/pentandra/specifications
[CC0 license]: https://creativecommons.org/publicdomain/zero/1.0/
[GitHub Flow]: https://guides.github.com/introduction/flow/
