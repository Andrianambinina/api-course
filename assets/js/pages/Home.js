import React from 'react';

const Home = () => {
    return (
        <div>
            <main class="flex-shrink-0">
                <div className="px-4 py-5 my-5 text-center">
                    <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72"
                         height="57" />
                    <h1 className="display-5 fw-bold">Marier React et Symfony</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, debitis, ea earum facilis
                            ipsa iusto magnam nemo nobis officia porro quas similique ullam voluptatibus.
                            A beatae commodi non rerum sapiente. Labore officiis ratione sapiente voluptatem.
                        </p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Decouvrir</button>
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4">En profiter</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
